from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
import openai
import sys, os, logging
from dotenv import load_dotenv
import yaml
from pyprojroot import here
from utils.load_config import LoadConfig
from utils.app_utils import Apputils

load_dotenv()
app = Flask(__name__)
app.secret_key = "WebGPT_secret_key"
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
app.config["CORS_HEADERS"] = "Content-Type"

APPCFG = LoadConfig()
session_histories = {}


@app.route("/api/chat", methods=["POST"])
@cross_origin(
    origin="*", headers=["Content-Type", "application/json"], supports_credentials=True
)
def chat():
    user_input = request.json.get("user_input")
    model_name = request.json.get("model_name")
    openai_api_key = request.json.get("openai_api_key")
    session_id = request.json.get("session_id")

    # If no session_id is provided, generate a new one
    if not session_id or session_id not in session_histories:
        session_id = os.urandom(16).hex()

    session["session_id"] = session_id

    # Set OpenAI API Key from request
    openai.api_key = openai_api_key
    openai.api_type = "openai"
    openai.api_base = "https://api.openai.com/v1"

    if session_id not in session_histories:
        session_histories[session_id] = []

    # Prepare messages
    chat_history = session_histories[session_id]

    # Validate user_input
    if user_input is not None:
        chat_history.append({"role": "user", "content": user_input})
    else:
        chat_history.append({"role": "user", "content": ""})

    messages = [
        {"role": "system", "content": APPCFG.llm_function_caller_sys_role}
    ] + chat_history

    # Get GPT response
    try:
        first_llm_response = Apputils.ask_llm_function_caller(
            gpt_model=model_name,
            temperature=APPCFG.temperature,
            messages=messages,
            function_json_list=Apputils.wrap_functions(),
        )
        if "choices" in first_llm_response and first_llm_response["choices"]:
            # response_content = first_llm_response["choices"][0]["message"]["content"]
            response_content = str(first_llm_response)
        else:
            response_content = "No valid response from the API."
    except openai.error.RateLimitError:
        response_content = (
            "Rate Limit Error. Please use another OpenAI Key or try again."
        )
    except openai.error.AuthenticationError:
        response_content = "Authentication error, please enter a valid Open AI api key!"
    except Exception as e:
        # response_content = f"An error occured. Please check you have the correct API key or try again later. {e}"
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        response_content = f"{exc_type}||||||{fname}||||||{exc_tb.tb_lineno}"

    chat_history.append({"role": "assistant", "content": response_content})
    session_histories[session_id] = chat_history

    response = jsonify(
        {
            "response": response_content,
            "chat_history": chat_history,
            "session_id": session_id,
            "session_histories": session_histories,
        }
    )
    # response.headers["session_id"] = session_id
    return response


@app.route("/api/clear", methods=["POST"])
@cross_origin(
    origin="*", headers=["Content-Type", "application/json"], supports_credentials=True
)
def clear():
    session_id = request.json.get("session_id")
    if session_id and session_id in session_histories:
        session_histories.pop(session_id)
    return jsonify({"message": "Chat history cleared!"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
