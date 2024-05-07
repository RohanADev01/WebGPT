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
  const [sessionId, setSessionId] = useState(() => {
    const savedSessionId = localStorage.getItem("session_id");
    return savedSessionId || "";
  });

  const api = axios.create({
    baseURL: backendURL,
    withCredentials: true,  // Enable cookies
  });

  useEffect(() => {
    if (!sessionId) {
      clearChat();
    }

    setChatHistory([]);
    setInput("");

    fetchChatHistory();
  }, [openAIkey]);


  const fetchChatHistory = async () => {
    try {
      const response = await api.post('/api/chat', {
        user_input: "",
        model_name: currentModel,
        openai_api_key: openAIkey,
        session_id: sessionId
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      console.log(response, response.data.session_id);
      console.log(response, response.data.session_histories);

      // Update session ID if a new one is created
      if (response.data.session_id && response.data.session_id !== sessionId) {
        const newSessionId = response.data.session_id;
        setSessionId(newSessionId);
        console.log("fetch chat history new session id: ", newSessionId);
        localStorage.setItem("session_id", newSessionId);
      }

      setChatHistory(response.data.chat_history);
      console.log(response.data.chat_history);
    } catch (error) {
      console.error("Error fetching chat history, ", error);
    }
  }

  const sendMessage = async (isSendEnabled) => {
    if (!isSendEnabled) return;

    try {
      const response = await api.post('/api/chat', {
        user_input: input,
        model_name: currentModel,
        openai_api_key: openAIkey,
        session_id: sessionId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(sessionId, response.data.session_id);

      // Update session ID if a new one is created
      if (response.data.session_id && response.data.session_id !== sessionId) {
        const newSessionId = response.data.session_id;
        setSessionId(newSessionId);
        console.log("send message new session id: ", newSessionId);
        localStorage.setItem("session_id", newSessionId);
      }

      setChatHistory(response.data.chat_history);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const clearChat = async () => {
    try {
      await api.post('/api/clear', { session_id: sessionId }, {
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

    console.log(sessionId);

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
        <Dashboard currentModel={currentModel} chatHistory={chatHistory} sendMessage={sendMessage} openAIkey={openAIkey} setInput={setInput} input={input} />
      </div>
    </>
  );
}

export default App;
