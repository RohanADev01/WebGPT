import React, { useState, useEffect } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import axios from 'axios';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1140);
  const [currentModel, setCurrentModel] = useState('GPT-3.5');
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState('');
  const [input, setInput] = useState("");
  const models = ['GPT-3.5', 'GPT-3.5-turbo', 'GPT-4', 'GPT-4-turbo', 'GPT-3.5-turbo-16k', 'GPT-3.5-turbo-16k-0309', 'GPT-3.5-turbo-13b'];

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.post('/api/chat', {
        user_input: "",
        model_name: currentModel
      })
      setChatHistory(response.data.chat_history);
    } catch (error) {
      console.error("Error fetching chat history, ", error);
    }
  }

  const sendMessage = async () => {
    try {
      const response = await axios.post("/api/chat", {
        user_input: input,
        model_name: currentModel,
      });
      setResponse(response.data.response);
      setChatHistory(response.data.chat_history);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const clearChat = async () => {
    try {
      await axios.post("/api/clear");
      setChatHistory([]);
      setResponse("");
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

  return (
    <>
      <div className="relative flex h-full w-screen">
        <div className="absolute inset-x-0 top-0 h-2px bg-top-gradient-border"></div>
        <Sidebar clearChat={clearChat} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} currentModel={currentModel} handleChangeModel={handleChangeModel} models={models} />
        <div className="absolute inset-x-0 top-0 h-2px bg-top-gradient-border"></div>
        <Dashboard isSidebarOpen={isSidebarOpen} currentModel={currentModel} chatHistory={chatHistory} />
      </div>
    </>
  );
}

export default App;
