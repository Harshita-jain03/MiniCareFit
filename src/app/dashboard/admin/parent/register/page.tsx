"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterParentPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "parent");
    formData.append("gender", gender);
    formData.append("is_active", isActive ? "true" : "false");

    if (profileImage) {
      formData.append("image", profileImage);
    }

    const response = await fetch("/api/admin/parent/register", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert(`✅ Parent registered!`);
      router.push("/dashboard/admin/parent");
    } else {
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
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border p-2 rounded text-black"
        />
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

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mr-2"
          />
          <label className="text-black">Active Status</label>
        </div>

        <div>
          <label className="block mb-1 text-black">Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded text-black"
          />
        </div>

        <button type="submit" className="bg-purple-600 text-white py-2 w-full rounded">
          Register Parent
        </button>
      </form>
    </div>
  );
}
