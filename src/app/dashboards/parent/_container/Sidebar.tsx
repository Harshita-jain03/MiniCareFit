import React from 'react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'health', label: 'Health', icon: '🍎' },
    { id: 'rewards', label: 'Rewards', icon: '🏆' },
    { id: 'todolist', label: 'To Do List', icon: '✅' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              currentPage === item.id
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-700'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}