"use client";
import { useRouter } from "next/navigation";
import { FaTools, FaInfoCircle, FaTachometerAlt, FaHeart } from "react-icons/fa";

export default function AppHeader() {
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-400 to-cyan-500 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <FaHeart className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wide">MiniCareFit</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="text-white hover:text-yellow-200 transition-colors duration-200 flex items-center gap-2 font-medium px-3 py-2 rounded-lg hover:bg-white/10">
              <FaTools className="text-lg" />
              Tools
            </button>
            <button className="text-white hover:text-yellow-200 transition-colors duration-200 flex items-center gap-2 font-medium px-3 py-2 rounded-lg hover:bg-white/10">
              <FaInfoCircle className="text-lg" />
              About Us
            </button>
          </nav>

          {/* Dashboard Button */}
          <button
            onClick={handleDashboardClick}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl"
          >
            <FaTachometerAlt />
            <span className="hidden sm:inline">Go to Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-yellow-200 transition-colors p-2 rounded-lg hover:bg-white/10">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}