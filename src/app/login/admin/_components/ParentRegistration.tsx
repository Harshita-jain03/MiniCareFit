"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft, FaUserPlus, FaHeart } from "react-icons/fa";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  childName: string;
  childAge: number;
};

interface ParentRegistrationProps {
  onBack: () => void;
}

export default function ParentRegistration({ onBack }: ParentRegistrationProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    console.log("Parent Registration:", data);
    // Connect to backend here
    // After successful registration, you might want to redirect or show success message
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] py-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium"
          >
            <FaArrowLeft />
            Back to Login
          </button>
          <div className="text-5xl mb-3">👨‍👩‍👧‍👦</div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Create Parent Account</h2>
          <p className="text-gray-600 text-sm">Join us in your child's healthy journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "At least 2 characters required"
                  }
                })}
                type="text"
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.firstName.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "At least 2 characters required"
                  }
                })}
                type="text"
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.lastName.message)}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address"
                }
              })}
              type="email"
              className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              })}
              type="tel"
              className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
              placeholder="1234567890"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.phone.message)}
              </p>
            )}
          </div>

          {/* Child Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2">
              <FaHeart />
              Your Child's Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Child's Name
                </label>
                <input
                  {...register("childName", {
                    required: "Child's name is required",
                    minLength: {
                      value: 2,
                      message: "At least 2 characters required"
                    }
                  })}
                  type="text"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
                  placeholder="Child's name"
                />
                {errors.childName && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(errors.childName.message)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Child's Age
                </label>
                <input
                  {...register("childAge", {
                    required: "Child's age is required",
                    min: {
                      value: 8,
                      message: "Child must be at least 8 years old"
                    },
                    max: {
                      value: 14,
                      message: "Child must be 14 years old or younger"
                    }
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm"
                  placeholder="Age"
                />
                {errors.childAge && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(errors.childAge.message)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm pr-8"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match"
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-sm pr-8"
                  placeholder="Confirm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                >
                  {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.confirmPassword.message)}
                </p>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mt-6"
          >
            <FaUserPlus />
            Create Account
          </button>
        </form>

        {/* Terms and Privacy */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-xs">
            By creating an account, you agree to our{" "}
            <button className="text-blue-600 hover:underline">Terms of Service</button>
            {" "}and{" "}
            <button className="text-blue-600 hover:underline">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
}