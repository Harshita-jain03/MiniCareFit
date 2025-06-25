"use client";
import { useState } from "react";
import { FaUserTie, FaChild, FaUserShield } from "react-icons/fa";
import LoginModal from "./modal/loginmodal";
// import RegistrationModal from "./modal/registrationmodal"; // new

export default function SplashScreen() {
  const [selectedRole, setSelectedRole] = useState<"Parent" | "Child" | "Admin">("Parent");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  const openLogin = (role: "Parent" | "Child" | "Admin") => {
    setSelectedRole(role);
    setLoginModalOpen(true);
    setRegistrationModalOpen(false);
  };

  const openRegister = () => {
    setLoginModalOpen(false);
    setRegistrationModalOpen(true);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setRegistrationModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-cyan-100 px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-4 text-center tracking-wide">
        Welcome to MiniCareFit
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-10 text-center">
        Join us your way — register as a Parent, Child, or Admin!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div
          onClick={() => openLogin("Parent")}
          className="cursor-pointer bg-white/60 hover:bg-white/90 transition p-6 rounded-2xl shadow-md text-center flex flex-col items-center"
        >
          <FaUserTie className="text-5xl text-fuchsia-600 mb-4" />
          <h3 className="text-xl font-semibold text-fuchsia-700 mb-2">
            Login as Parent
          </h3>
          <p className="text-sm text-gray-600">
            Stay updated on your child’s progress.
          </p>
        </div>

        <div
          onClick={() => openLogin("Child")}
          className="cursor-pointer bg-white/60 hover:bg-white/90 transition p-6 rounded-2xl shadow-md text-center flex flex-col items-center"
        >
          <FaChild className="text-5xl text-cyan-600 mb-4" />
          <h3 className="text-xl font-semibold text-cyan-700 mb-2">
            Login as Child
          </h3>
          <p className="text-sm text-gray-600">
            Build healthy habits and have fun!
          </p>
        </div>

        <div
          onClick={() => openLogin("Admin")}
          className="cursor-pointer bg-white/60 hover:bg-white/90 transition p-6 rounded-2xl shadow-md text-center flex flex-col items-center"
        >
          <FaUserShield className="text-5xl text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-purple-700 mb-2">
            Admin Login
          </h3>
          <p className="text-sm text-gray-600">
            Manage users and monitor platform growth.
          </p>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={closeModals}
        onRegisterClick={openRegister} // add this to enable "Register" button
        role={selectedRole}
      />

    </div>
  );
}
