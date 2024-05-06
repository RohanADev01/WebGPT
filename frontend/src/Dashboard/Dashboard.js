import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { IoMdSend } from "react-icons/io";

const Dashboard = ({ chatHistory, sendMessage, openAIkey }) => {
  const [sendEnabled, setSendEnabled] = useState(false);

  function chatInputChange(e) {
    if (e.target.value !== null && e.target.value !== '') {
      setSendEnabled(true);
    } else {
      setSendEnabled(false);
    }
  }

  return (
    <div className="flex-1 px-14 py-8 bg-app-bg">
      <div className='h-full px-2 py-10'>
        {/* Chat Area */}
        <div className='flex flex-col border-white-100 border-2 h-full rounded-lg'>
          {openAIkey !== "" ?
            (<div className='p-10 flex-grow'>
              <h1>Dashboard</h1>
              {/* Main content area. */}
              <div>
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={msg.role}>
                    {msg.content}
                    {msg.role}
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
              <input onChange={(e) => chatInputChange(e)} className='outline-none bg-app-bg px-10 py-3 w-full rounded-br-lg rounded-bl-lg border-bl-2' type='text' placeholder='Enter your prompt here...' />
              <button onClick={sendMessage} className={`mx-2 my-3 px-3 rounded-lg border-2 border-l-2 ${sendEnabled ? 'cursor-pointer border-white-100 text-white' : 'cursor-not-allowed disabled border-gray-600 text-slate-600'}`}>
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