import React from 'react'
import './sidebar.css'
import sidebarOpenArrow from '../img/sidebar_open_arrow.png';
import sidebarCloseArrow from '../img/sidebar_close_arrow.png';
import logo from '../img/logo.png';

const Sidebar = ({ isOpen, toggleSidebar, currentModel, handleChangeModel, models, clearChat, handleChangeOpenAIKey }) => {
  return (
    <div className={`relative bg-[#171717] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src={isOpen ? sidebarCloseArrow : sidebarOpenArrow} width='16px' height='16px' alt='sidebar-menu-arrow' />
      </button>
      {isOpen &&
        <div className="px-5 py-8 w-72 flex-col">
          <div className='h-full px-2 py-10 flex-col justify-center items-center'>
            <h1 className='font-black justify-center items-center text-center text-2xl'>WebGPT</h1>
            <h2 className='font-medium justify-center items-center text-center'>A GPT Agent that addresses the problem of LLM Knowledge cut-off with real-time web search capabilities</h2>
            <div className='flex justify-center items-center mt-4'>
              <img className="justify-center items-center" src={logo} alt='logo' width='60%' height='60%'></img>
            </div>
            <div className="flex-col items-center justify-start mt-4">
              <p className='mb-1'>Choose a Model:</p>
              {models.map((modelName, idx) => (
                <label className="flex items-center space-x-2 ml-1" key={modelName}>
                  <input
                    type="radio"
                    name="model"
                    value={modelName}
                    checked={currentModel === modelName}
                    onChange={() => handleChangeModel(modelName)}
                  />
                  <span>{modelName}</span>
                </label>
              ))}
            </div>
            <div className="flex-col items-center justify-start mt-4">
              <p className='mb-1'>OpenAI key:</p>
              <input onChange={e => handleChangeOpenAIKey(e.target.value)} className='space-x-2 bg-app-bg p-2 rounded-lg border-2 border-white-100 text-white' type="text" />
            </div>
            <button className='mt-4 my-3 px-3 rounded-lg border-2 border-l-2 cursor-pointer border-white-100 text-white' onClick={clearChat}>Clear Chat</button>
          </div>
        </div>}
    </div>
  )
}

export default Sidebar