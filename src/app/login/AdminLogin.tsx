// "use client";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { FaEye, FaEyeSlash, FaShieldAlt, FaCog } from "react-icons/fa";

// type FormData = {
//   email: string;
//   password: string;
// };

// export default function AdminLogin() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = (data: FormData) => {
//     console.log("Admin Login:", data);
//     // Connect to backend here
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh]">
//       <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 border border-purple-200">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="text-6xl mb-4">👨‍💼</div>
//           <h2 className="text-3xl font-bold text-purple-600 mb-2">Admin Access</h2>
//           <p className="text-gray-600">System Administration Panel</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//               <FaShieldAlt className="text-purple-500" />
//               Admin Email
//             </label>
//             <input
//               {...register("email", {
//                 required: "Admin email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Please enter a valid email address"
//                 }
//               })}
//               type="email"
//               className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
//               placeholder="admin@minicareit.com"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {String(errors.email.message)}
//               </p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//               <FaCog className="text-purple-500" />
//               Admin Password
//             </label>
//             <div className="relative">
//               <input
//                 {...register("password", {
//                   required: "Admin password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters"
//                   }
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors pr-12"
//                 placeholder="Enter admin password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-500"
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {String(errors.password.message)}
//               </p>
//             )}
//           </div>

//           {/* Security Notice */}
//           <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
//             <p className="text-purple-700 text-sm flex items-center gap-2">
//               <FaShieldAlt />
//               Secure admin access only
//             </p>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
//           >
//             <FaShieldAlt />
//             Access Admin Panel
//           </button>
//         </form>

//         {/* Security Footer */}
//         <div className="text-center mt-6">
//           <p className="text-gray-500 text-xs">
//             🔒 This is a secure administrative area
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }