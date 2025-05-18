'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
            
            {/* Dashboard Content */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Sample Cards - Replace with your content */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                <p className="text-gray-600">Main content area that will be replaced when navigating to other pages.</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <p className="text-gray-600">Your recent project activities will appear here.</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <p className="text-gray-600">You have no new notifications.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}