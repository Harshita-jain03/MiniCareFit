"use client";
import { FaHeart, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-green-500 via-blue-500 to-cyan-600 text-white py-8 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FaHeart className="text-yellow-300 text-xl animate-pulse" />
              </div>
              <span className="text-2xl font-bold tracking-wide">MiniCareFit</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering children to build healthy habits for a brighter, healthier future.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span>Made with</span>
              <FaHeart className="text-yellow-300 animate-pulse" />
              <span>for healthy kids everywhere</span>
            </div>
            <div className="text-white/80 text-sm">
              © 2025 MiniCareFit. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}