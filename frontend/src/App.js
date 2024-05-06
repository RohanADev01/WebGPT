import React, { useState, useEffect } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import './App.css';

function App () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1140);
  const [currentModel, setCurrentModel] = useState('GPT-3.5');
  const models = ['GPT-3.5', 'GPT-3.5-turbo', 'GPT-4', 'GPT-4-turbo', 'GPT-3.5-turbo-16k', 'GPT-3.5-turbo-16k-0309', 'GPT-3.5-turbo-13b'];

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
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} currentModel={currentModel} handleChangeModel={handleChangeModel} models={models} />
        <div className="absolute inset-x-0 top-0 h-2px bg-top-gradient-border"></div>
        <Dashboard isSidebarOpen={isSidebarOpen} currentModel={currentModel} />
      </div>
    </>
  );
}

export default App;
