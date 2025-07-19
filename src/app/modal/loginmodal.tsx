"use client";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void; // ✅ Added for the register link
  role: "Parent" | "Child" | "Admin";
};

export default function LoginModal({ isOpen, onClose, onRegisterClick, role }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          {role === "Parent" ? "👨‍👩‍👧‍👦 Parent Login" : role === "Child" ? "🧒 Child Login" : "🛡️ Admin Login"}
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Log In
          </button>
        </form>

       
      </div>
    </div>
  );
}