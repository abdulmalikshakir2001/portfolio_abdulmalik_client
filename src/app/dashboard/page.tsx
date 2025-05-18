"use client";

import { useState } from 'react';
import { Menu, LogOut, ChevronDown, Folder } from 'lucide-react';
import ProjectForm from '@/components/ProjectForm';

type ContentType = 'projects' | 'dashboard';

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<ContentType>('projects');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h2 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>Dashboard</h2>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-slate-700">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            <li 
              className={`p-4 hover:bg-slate-700 cursor-pointer flex items-center gap-4 ${activeContent === 'projects' ? 'bg-slate-700' : ''}`}
              onClick={() => setActiveContent('projects')}
            >
              <Folder size={20} />
              {isSidebarOpen && <span>Projects</span>}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 py-3">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                <span>Account</span>
                <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button 
                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeContent === 'projects' && <ProjectForm />}
        </main>
      </div>
    </div>
  );
}