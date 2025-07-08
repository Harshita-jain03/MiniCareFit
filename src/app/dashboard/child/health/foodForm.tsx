"use client";
import { useState } from "react";

export default function FoodForm() {
  const [formData, setFormData] = useState({
    food: "",
    quantity: "",
    date: "",
    mealType: "Breakfast",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can send formData to an API here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 max-w-lg space-y-4"
    >
      <h2 className="text-xl text-blue-600 font-bold mb-4">Add Food Item</h2>

      <div>
        <label className="block text-sm text-black font-medium mb-1">Food Item</label>
        <input
          type="text"
          name="food"
          value={formData.food}
          onChange={handleChange}
          required
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
          placeholder="Enter food name"
        />
      </div>

      <div>
        <label className="block text-black text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
          placeholder="e.g., 2"
        />
      </div>

      <div>
        <label className="block text-black text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-black text-sm font-medium mb-1">
          Breakfast / Lunch / Dinner
        </label>
        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="w-full text-black border border-gray-300 rounded px-3 py-2"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded font-medium w-full hover:bg-blue-700"
      >
        Add Food Item
      </button>
    </form>
  );
}
