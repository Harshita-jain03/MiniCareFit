"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Lottie from "lottie-react";
import adminAnimation from "../../../animations/admin/login.json";






type FormData = {
  email: string;
  password: string;
};

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Admin Login:", data);
    // You can connect to backend or add role check here
  };

  return (
    // <div className="flex h-screen w-full  bg-gradient-to-br from-teal-200 via-green-200 to-green-500">
    <div
        className="flex h-screen w-full"
        style={{
            background: "linear-gradient(to bottom right,rgb(232, 253, 244),rgb(184, 245, 236),rgb(130, 209, 238))"
        }}
        >

      {/* 👦 Left Image Section */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-8">
        <img
          src="/images/admin-illustration.png"
          alt="Admin Illustration"
          className="max-w-full h-auto"
        />
      </div>

      {/* 🔐 Right Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        {/* <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-lg"> */}
        <div className="bg-white/25 backdrop-blur-md p-10 rounded-xl shadow-xl">

        <Lottie
            animationData={adminAnimation}
            loop
            autoplay
            className="w-40 h-40 mx-auto mb-4"
        />
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 border-b-2 border-gray-400 bg-transparent text-black placeholder-black focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 border-b-2 border-gray-400 bg-transparent text-black placeholder-black focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition-all"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}



