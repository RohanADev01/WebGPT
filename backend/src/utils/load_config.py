import openai
import os
from dotenv import load_dotenv
import yaml
from pyprojroot import here
load_dotenv()

class LoadConfig:
  """
    Class for loading configuration settings, including OpenAI Credentials.

    Reads configuration settings from a YAML file and sets them as attributes.
    Includes a method to load OpenAI Credentials.
  """

  def __init__(self) -> None:
    with open(here("configs/app_config.yaml"), "r") as cfg:
      app_config = yaml.load(cfg, Loader=yaml.FullLoader)
    self.gpt_model = app_config["gpt_model"]
    self.temperature = app_config["temperature"]
    self.llm_sys_role = "You are a useful chatbot."
    self.llm_function_caller_sys_role = app_config["llm_function_caller_sys_role"]
    self.llm_function_caller_prompt = app_config["llm_function_caller_prompt"]

    self.load_openai_credentials()

  def load_openai_credentials(self):
    """
      Load OpenAI configuration settings.

      Set OpenAI API config settings, including API type, base URL, version, API Key.
      Called at the beginning of a script or application to configure OpenAI settings.
    """
    openai.api_type = os.getenv("OPENAI_API_TYPE")
    openai.api_base = os.getenv("OPENAI_API_BASE")
    openai.api_version = os.getenv("OPENAI_API_VERSION")
    openai.api_key = os.getenv("OPENAI_API_KEY")