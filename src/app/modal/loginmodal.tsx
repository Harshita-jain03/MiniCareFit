// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   role: "Parent" | "Child" | "Teacher";
// };

// export default function LoginModal({ isOpen, onClose, role }: Props) {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false); // ✅ added loading state

//   if (!isOpen) return null;

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.error || "Login failed");
//       }

//       const data = await res.json();

//       // ✅ Redirect based on role
//       if (data.role === "Teacher") {
//         router.push("/dashboard/admin");
//       } else if (data.role === "Parent") {
//         router.push("/dashboard/parent");
//       } else if (data.role === "Child") {
//         router.push("/dashboard/child");
//       } else {
//         throw new Error("Unknown role");
//       }

//       onClose(); // ✅ close the modal
//     } catch (err: any) {
//       setErrorMsg(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//       <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
//         >
//           &times;
//         </button>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
//           {role === "Parent"
//             ? "👨‍👩‍👧‍👦 Parent Login"
//             : role === "Child"
//             ? "🧒 Child Login"
//             : "🛡️ Teacher Login"}
//         </h2>

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
//             required
//           />

//           {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all"
//           >
//             {loading ? "Logging in..." : "Log In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick:()=>void;
  role: "Parent" | "Child" | "Admin";
};

export default function LoginModal({ isOpen, onClose, role }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:8000/users/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // Assuming your backend expects username
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // ✅ Save token
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // ✅ Redirect user based on selected role
      if (role === "Admin") {
        router.push("/dashboard/admin");
      } else if (role === "Parent") {
        router.push("/dashboard/parent");
      } else if (role === "Child") {
        router.push("/dashboard/child");
      } else {
        throw new Error("Unknown role");
      }

      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          {role === "Parent"
            ? "👨‍👩‍👧‍👦 Parent Login"
            : role === "Child"
            ? "🧒 Child Login"
            : "🛡️ Teacher Login"}
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            required
          />

          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
