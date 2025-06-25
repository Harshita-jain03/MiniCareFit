// "use client";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { FaEye, FaEyeSlash, FaGamepad } from "react-icons/fa";

// type FormData = {
//   username: string;
//   password: string;
// };

// export default function ChildLogin() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = (data: FormData) => {
//     console.log("Child Login:", data);
//     // Connect to backend here
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh]">
//       <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4">
//         {/* Fun Header */}
//         <div className="text-center mb-8">
//           <div className="text-6xl mb-4">🎮</div>
//           <h2 className="text-3xl font-bold text-green-600 mb-2">Welcome Back!</h2>
//           <p className="text-gray-600">Ready for some fun activities?</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Username Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Your Cool Username 😎
//             </label>
//             <input
//               {...register("username", {
//                 required: "Don't forget your username!",
//                 minLength: {
//                   value: 3,
//                   message: "Username needs at least 3 characters"
//                 }
//               })}
//               type="text"
//               className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors text-lg"
//               placeholder="Enter your username"
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                 😕 {String(errors.username.message)}
//               </p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Secret Password 🔐
//             </label>
//             <div className="relative">
//               <input
//                 {...register("password", {
//                   required: "You need your secret password!",
//                   minLength: {
//                     value: 4,
//                     message: "Password needs at least 4 characters"
//                   }
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors text-lg pr-12"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-500"
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                 😕 {String(errors.password.message)}
//               </p>
//             )}
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
//             >

//             <FaGamepad />
//             Let's Play & Learn! 🚀
//           </button>
//         </form>

//         {/* Fun Footer */}
//         <div className="text-center mt-6 text-gray-500">
//           <p className="text-sm">Need help? Ask your parents! 👨‍👩‍👧‍👦</p>
//         </div>
//       </div>
//     </div>
//   );
// }