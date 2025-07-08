// import BaseMenuItem, {MenuItemConfig} from "../ui/baseMenuItem";
// import { FaTachometerAlt, FaUser, FaTasks,FaGift,FaClipboardList,FaStopwatch } from "react-icons/fa";
// import { MdFavorite, MdFavoriteBorder, MdLocalHospital } from "react-icons/md";
// //import { , FaStar, FaTrophy, FaMedal } from "react-icons/fa";


// const childMenu: MenuItemConfig[] = [
//   { label: "Dashboard", href: "/dashboard/parent",  },
//   { label: "Health", href: "/dashboard/parent/health", icon: <MdLocalHospital  /> },
//   { label: "Reward", href: "/dashboard/parent/rewards", icon: <FaGift /> },
//   { label: "Tools", href: "/dashboard/parent/tools", icon: <FaStopwatch /> },
//   { label: "To-Do List", href: "/dashboard/parent/todolist", icon: <FaClipboardList /> }
  
// ];

// export default function ParentSidebar() {
//   return (
//     <div className="w-64 bg-gray-900 text-white p-4 min-h-screen space-y-4">
//       <h2 className="text-2xl font-bold text-blue-400 mb-6">Student</h2>
//       {childMenu.map((item, index) => (
//         <BaseMenuItem key={index} item={item} />
//       ))}
//     </div>
//   );
// }


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