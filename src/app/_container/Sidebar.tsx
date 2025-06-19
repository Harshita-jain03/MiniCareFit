"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaListAlt, 
  FaHeartbeat, 
  FaTools, 
  FaUser, 
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaHome
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { icon: FaHome, label: "Home", color: "text-blue-500", bgColor: "bg-blue-50" },
    { icon: FaListAlt, label: "To Do", color: "text-green-500", bgColor: "bg-green-50" },
    { icon: FaHeartbeat, label: "Health", color: "text-red-500", bgColor: "bg-red-50" },
    { icon: FaTools, label: "Tools", color: "text-purple-500", bgColor: "bg-purple-50" },
    { icon: FaUser, label: "Profile", color: "text-orange-500", bgColor: "bg-orange-50" },
  ];

  const handleLogout = () => {
    // Add logout logic here
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-20 left-4 z-50 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isOpen ? <FaTimes className="text-blue-600" /> : <FaBars className="text-blue-600" />}
      </button>

      {/* Overlay for mobile - with better styling */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:relative lg:z-auto lg:top-0 lg:h-[calc(100vh-8rem)]
      `}>
        {/* Sidebar Header */}
        <div className="bg-gradient-to-br from-green-400 via-blue-300 to-cyan-400 p-6 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaHeartbeat className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold">MiniCareFit</h2>
              <p className="text-white/80 text-sm">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Menu Items - Scrollable area */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md group ${item.bgColor} hover:${item.bgColor}`}
              onClick={() => {
                // Handle navigation here
                console.log(`Navigate to ${item.label}`);
                setIsOpen(false); // Close mobile menu after selection
              }}
            >
              <div className={`p-2 rounded-lg ${item.color} bg-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="text-lg" />
              </div>
              <span className={`font-semibold text-gray-700 group-hover:${item.color} transition-colors duration-300`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout Button - Always at bottom */}
        <div className="p-4 flex-shrink-0 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-300 hover:scale-105 hover:shadow-md group"
          >
            <div className="p-2 rounded-lg text-red-500 bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
              <FaSignOutAlt className="text-lg" />
            </div>
            <span className="font-semibold text-gray-700 group-hover:text-red-500 transition-colors duration-300">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
}