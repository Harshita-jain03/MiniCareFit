"use client";
import { useRouter } from "next/navigation";
import { FaHeart, FaSignOutAlt } from "react-icons/fa";

interface AppHeaderProps {
  role: "Teacher" | "Parent" | "Child";
}

export default function AppHeader({ role }: AppHeaderProps) {
  const router = useRouter();

  const roleEmojis: Record<string, string> = {
    Teacher: "🛡️",
    Parent: "👨‍👩‍👧‍👦",
    Child: "🎮",
  };

  return (
    
    <header className="w-full bg-gradient-to-r from-blue-800 via-indigo-600 to-sky-500 shadow-md backdrop-blur-sm border-b border-white/20">
      <div className="w-full px-4 h-12 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
            <FaHeart className="text-white text-sm" />
          </div>
        </div>

        {/* Center: Role Header */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base sm:text-lg font-bold text-white tracking-wide drop-shadow-md whitespace-nowrap">
          {roleEmojis[role]} {role} Dashboard
        </h1>

        {/* Right: Logout */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1 text-white px-3 py-1 text-sm rounded-full font-medium hover:bg-white/30 hover:scale-105 transition-all duration-200 border border-white/30 shadow-sm backdrop-blur-sm"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
