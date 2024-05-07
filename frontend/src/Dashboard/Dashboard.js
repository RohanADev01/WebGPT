import React, { useEffect, useRef, useState } from 'react'
import './dashboard.css'
import { IoMdSend } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { RiRobot2Line } from "react-icons/ri";

const Dashboard = ({ chatHistory, sendMessage, openAIkey, setInput, input }) => {
  const [sendEnabled, setSendEnabled] = useState(false);
  const inputRef = useRef(null);

  function chatInputChange(e) {
    const inputValue = e.target.value;
    if (inputValue !== null && inputValue !== '') {
      setSendEnabled(true);
    } else {
      setSendEnabled(false);
    }
    setInput(inputValue);
  }

  const handleKeyPress = (e) => {
    if (sendEnabled && e.key === 'Enter') {
      sendMessage(true);
      setInput('');
      setSendEnabled(false);
      inputRef.current.focus();
    }
  }

  return (
    <div className="flex-1 px-14 py-8 bg-app-bg">
      <div className='h-full px-2 py-10'>
        {/* Chat Area */}
        <div className='flex flex-col border-white-100 border-2 h-full rounded-lg'>
          {openAIkey !== "" ?
            (<div className='p-10 flex-grow overflow-scroll'>
              <h1 className='font-bold mb-10 text-xl chat-title'>Chat History</h1>
              {/* Main content area. */}
              <div className="flex flex-col gap-4">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"
                      }`}
                  >
                    <div className={`flex items-center space-x-2 max-w-lg ${msg.role === "user" ? "flex-row" : "flex-row-reverse"
                      }`}>
                      {/* User Icon */}
                      {msg.role === "user" ? (
                        <div className="bg-[#171717] rounded-full w-10 h-10 flex items-center justify-center text-white">
                          <LuUser width="10px" height="10px" />
                        </div>
                      ) : (
                        <div className="bg-[#171717] ml-2 rounded-full w-10 h-10 flex items-center justify-center text-white">
                          <RiRobot2Line width="10px" height="10px" />
                        </div>
                      )}
                      {/* Message Box */}
                      <div className={`px-4 py-2 rounded-lg ${msg.role === "user" ? "bg-[#171717]" : "bg-[#171717]"
                        }`}>
                        {msg.content === "" ? "Hello!" : msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>)
            : (<div className='p-10 flex-grow'>Enter an OpenAI Key to begin...</div>)
          }
          {/* Chat input box */}
          <div className='flex-shrink-0'>
            <div className='relative flex flex-col justify-center items-center rounded-lg w-full'>
              <div className="absolute top-0 h-2px bg-top-gradient-border w-full"></div>
            </div>
            <div className='flex flex-row rounded-br-lg rounded-bl-lg bg-app-bg border-t-white-100 border-t-2'>
              <input ref={inputRef} onKeyPress={handleKeyPress} onChange={(e) => chatInputChange(e)} value={input} className='outline-none bg-app-bg px-10 py-3 w-full rounded-br-lg rounded-bl-lg border-bl-2' type='text' placeholder='Enter your prompt here...' />
              <button onClick={() => sendMessage(sendEnabled)} className={`mx-2 my-3 px-3 rounded-lg border-2 border-l-2 ${sendEnabled ? 'cursor-pointer border-white-100 text-white' : 'cursor-not-allowed disabled border-gray-600 text-slate-600'}`}>
                <div className='flex flex-row justify-center items-center'>
                  <IoMdSend />
                  <p className='pl-1'>Send</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-app-bg flex-row">
        <div className='justify-center items-center'>
          <p className='text-center text-xs'>Created by RohanADev01, 2024</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard