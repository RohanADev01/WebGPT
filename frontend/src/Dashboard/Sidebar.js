import React from 'react'
import './sidebar.css'
import sidebarOpenArrow from '../img/sidebar_open_arrow.png';
import sidebarCloseArrow from '../img/sidebar_close_arrow.png';
import logo from '../img/logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`relative bg-[#171717] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src={isOpen ? sidebarCloseArrow : sidebarOpenArrow} width='16px' height='16px' alt='sidebar-menu-arrow' />
      </button>
      {isOpen &&
        <div className="px-5 py-8 w-72 flex-col">
          <div className='h-full px-2 py-10 flex-col justify-center items-center'>
            <h1 className='font-black justify-center items-center text-center text-2xl'>WebGPT</h1>
            <h2 className='font-extrabold justify-center items-center text-center'>GPT Agent with access to the internet</h2>
            <div className='flex justify-center items-center mt-10'>
              <img classname="justify-center items-center" src={logo} alt='logo' width='60%' height='60%'></img>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default Sidebar