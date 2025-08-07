// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterStudentPage() {
//   const [username, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [grade, setGrade] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:8000/users/users/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username,
       
//         email,
//         password,
//         role: "child", // always child for student registration
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert(`✅ Student registered!\nLogin Email: ${email}\nPassword: ${password}`);
//       router.push("/dashboard/admin/student");
//     } else {
//       alert(`❌ Error: ${data.error}`);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
//       <h2 className="text-2xl font-bold text-purple-700 mb-4">Register Student</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <input
//           placeholder="Student Name"
//           value={username}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full border p-2 rounded text-black"
//         />
//         {/* <input
//         //   placeholder="Age"
//         //   type="number"
//         //   value={age}
//         //   onChange={(e) => setAge(e.target.value)}
//         //   required
//         //   className="w-full border p-2 rounded text-black"
//         // />
//         // <input
//         //   placeholder="Grade"
//         //   value={grade}
//         //   onChange={(e) => setGrade(e.target.value)}
//         //   required
//         //   className="w-full border p-2 rounded text-black"
//         // /> */}
//         <input
//           placeholder="Student Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full border p-2 rounded text-black"
//         />
//         <input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full border p-2 rounded text-black"
//         />

//         <button type="submit" className="bg-purple-600 text-white py-2 w-full rounded">
//           Register Student
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterStudentPage() {
  const [username, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "child");
    formData.append("age", age);
    formData.append("grade", grade);
    formData.append("gender", gender);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("http://localhost:8000/users/users/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert(`✅ Student registered!\nLogin Email: ${email}\nPassword: ${password}`);
      router.push("/dashboard/admin/student");
    } else {
      alert(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Register Student</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="Student Name"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        />
        <input
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full border p-2 rounded text-black"
        />
        <input
          placeholder="Student Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded text-black"
        />
        <button type="submit" className="bg-purple-600 text-white py-2 w-full rounded">
          Register Student
        </button>
      </form>
    </div>
  );
}
