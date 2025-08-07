// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// export default function EditStudentPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [formData, setFormData] = useState({ username: "", email: "" });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     const fetchStudent = async () => {
//       try {
//         const res = await fetch(`http://localhost:8000/users/users/${id}/`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         setFormData({ username: data.username, email: data.email });
//       } catch (err) {
//         console.error("Failed to fetch student:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchStudent();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("access_token");

//     try {
     
//       const res = await fetch(`http://localhost:8000/users/users/${id}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           id,
//           username: formData.username,
//           email: formData.email,
//         }),
//       });

//       if (res.ok) {
//         alert("✅ Student updated successfully");
//         router.push("/dashboard/admin/student");
//       } else {
//         const err = await res.json();
//         alert("❌ Failed: " + (err?.error || "Unknown error"));
//       }
//     } catch (err) {
//       console.error("Error during PATCH:", err);
//     }
//   };

//   if (loading) return <p>Loading student...</p>;

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-black">✏️ Edit Student</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1 text-black">Username:</label>
//           <input
//             type="text"
//             value={formData.username}
//             onChange={(e) =>
//               setFormData({ ...formData, username: e.target.value })
//             }
//             className="w-full p-2 border rounded text-black"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1 text-black">Email:</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             className="w-full p-2 border rounded text-black"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           💾 Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    is_active: false,
    image: null as File | null,
    currentImage: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:8000/users/users/${id}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setFormData({
          username: data.username || "",
          email: data.email || "",
          age: data.age ? String(data.age) : "",
          gender: data.gender || "",
          is_active: data.is_active || false,
          image: null,
          currentImage: data.image || "",
        });
      } catch (err) {
        console.error("Failed to fetch student:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const formPayload = new FormData();
      formPayload.append("username", formData.username);
      formPayload.append("email", formData.email);
      formPayload.append("age", formData.age);
      formPayload.append("gender", formData.gender);
      formPayload.append("is_active", String(formData.is_active));
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const res = await fetch(`http://localhost:8000/users/users/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      if (res.ok) {
        alert("✅ Student updated successfully");
        router.push("/dashboard/admin/student");
      } else {
        const err = await res.json();
        alert("❌ Failed: " + (err?.detail || "Unknown error"));
      }
    } catch (err) {
      console.error("Error during PATCH:", err);
    }
  };

  if (loading) return <p>Loading student...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">✏️ Edit Student</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-black">Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Age:</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Gender:</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Active Status:</label>
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="mr-2"
          />
          <span className="text-black">{formData.is_active ? "Active" : "Inactive"}</span>
        </div>

        <div>
          <label className="block font-medium mb-1 text-black">Profile Image:</label>
          {formData.currentImage && (
            <img src={formData.currentImage} alt="Current" className="w-20 h-20 mb-2 rounded-full" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}
