from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv
import yaml
from pyprojroot import here
from utils.load_config import LoadConfig
from utils.app_utils import Apputils

load_dotenv()
app = Flask(__name__)

APPCFG = LoadConfig()
chat_history = []


@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get("user_input")
    model_name = request.json.get("model_name")

    # Prepare messages
    global chat_history
    chat_history.append({"role": "user", "content": user_input})
    messages = [
        {"role": "system", "content": APPCFG.llm_function_caller_sys_role}
    ] + chat_history

    # Get GPT response
    first_llm_response = Apputils.ask_llm_function_caller(
        gpt_model=model_name,
        temperature=APPCFG.temperature,
        messages=messages,
        function_json_list=Apputils.wrap_functions(),
    )

    response_content = first_llm_response["choices"][0]["message"]["content"]
    chat_history.append({"role": "assistant", "content": response_content})

    return jsonify({"response": response_content, "chat_history": chat_history})


@app.route("/api/clear", methods=["POST"])
def clear():
    global chat_history
    chat_history = []
    return jsonify({"message": "Chat history cleared!"})


if __name__ == "__main__":
    app.run(debug=True)
