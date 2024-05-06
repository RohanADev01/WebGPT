from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import openai
import os
from dotenv import load_dotenv
import yaml
from pyprojroot import here
from utils.load_config import LoadConfig
from utils.app_utils import Apputils

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["CORS_HEADERS"] = "Content-Type"

APPCFG = LoadConfig()
chat_history = []


@app.route("/api/chat", methods=["POST"])
@cross_origin(origin="*", headers=["Content-Type", "application/json"])
def chat():
    user_input = request.json.get("user_input")
    model_name = request.json.get("model_name")
    openai_api_key = request.json.get("openai_api_key")

    # Set OpenAI API Key from request
    openai.api_key = openai_api_key
    openai.api_type = "open_ai"
    openai.api_base = "https://api.openai.com/v1"

    # Prepare messages
    global chat_history
    chat_history.append({"role": "user", "content": user_input})
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
        response_content = first_llm_response.choices[0].message.content
    except openai.error.RateLimitError:
        response_content = (
            "Rate Limit Error. Please use another OpenAI Key or try again."
        )
    except:
        response_content = "An error occured. Please check you have the correct API Key or try again later."

    chat_history.append({"role": "assistant", "content": response_content})

    return jsonify({"response": response_content, "chat_history": chat_history})


@app.route("/api/clear", methods=["POST"])
@cross_origin(origin="*", headers=["Content-Type", "application/json"])
def clear():
    global chat_history
    chat_history = []
    return jsonify({"message": "Chat history cleared!"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
