"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterParentPage() {
  const [username, setName] = useState("");
  // const [child_name, setChildName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("http://localhost:8000/users/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,           // ✅ this fixes the "username is required" error
      // child_name,
      email,
      password,
      role: "parent",           // ✅ Capitalize properly if backend expects "Parent"
    }),
  });

  const data = await response.json();

  if (response.ok) {
    alert(`✅ parent registered!\nLogin Email: ${email}\nPassword: ${password}`);
    router.push("/dashboard/admin/parent");
  } else {
    console.error(data);  // helpful for debugging in dev
    alert(`❌ Error: ${JSON.stringify(data)}`);
  }
};

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Register Parent</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          placeholder="Parent Name"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        />
        {/* <input
          placeholder="Child_name"
       
          value={child_name}
          onChange={(e) => setChildName(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        />
        */}
        <input
          placeholder="Parent Email"
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

        <button type="submit" className="bg-purple-600 text-white py-2 w-full rounded">
          Register Parent
        </button>
      </form>
    </div>
  );
}
