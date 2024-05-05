import React, { useState, useEffect } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import './App.css';

function App () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1140);

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

  return (
    <>
      <div className="relative flex h-full w-screen">
        <div className="absolute inset-x-0 top-0 h-1px bg-top-gradient-border"></div>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="absolute inset-x-0 top-0 h-1px bg-top-gradient-border"></div>
        <Dashboard isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
}

export default App;
