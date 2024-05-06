import React, { useState, useEffect } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import axios from 'axios';
import './App.css';
import { backendURL, models } from './constants';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1140);
  const [currentModel, setCurrentModel] = useState('gpt-3.5-turbo');
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [openAIkey, setOpenAIKey] = useState("");

  useEffect(() => {
    if (openAIkey !== "") {
      fetchChatHistory();
    }
  }, [openAIkey]);

  const fetchChatHistory = async () => {
    const url = `${backendURL}/api/chat`
    try {
      const response = await axios.post(url, {
        user_input: "",
        model_name: currentModel,
        openai_api_key: openAIkey,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      setChatHistory(response.data.chat_history);
    } catch (error) {
      console.error("Error fetching chat history, ", error);
    }
  }

  const sendMessage = async () => {
    const url = `${backendURL}/api/chat`
    try {
      const response = await axios.post(url, {
        user_input: input,
        model_name: currentModel,
        openai_api_key: openAIkey,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setChatHistory(response.data.chat_history);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const clearChat = async () => {
    const url = `${backendURL}/api/clear`
    try {
      await axios.post(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setChatHistory([]);
      setInput("");
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1140) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChangeModel = (newModel) => {
    setCurrentModel(newModel);
  }

  const handleChangeOpenAIKey = (newKey) => {
    setOpenAIKey(newKey);
  }

  return (
    <>
      <div className="relative flex h-full w-screen">
        <div className="absolute inset-x-0 top-0 h-2px bg-top-gradient-border"></div>
        <Sidebar clearChat={clearChat} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} currentModel={currentModel} handleChangeModel={handleChangeModel} models={models} handleChangeOpenAIKey={handleChangeOpenAIKey} />
        <div className="absolute inset-x-0 top-0 h-2px bg-top-gradient-border"></div>
        <Dashboard currentModel={currentModel} chatHistory={chatHistory} sendMessage={sendMessage} openAIkey={openAIkey} />
      </div>
    </>
  );
}

export default App;
