"use client";

type FoodEntry = {
  food: string;
  mealType: string;
  quantity: string;
};

export default function FoodTable({ items }: { items: FoodEntry[] }) {
  return (
    <table className="w-full text-base border">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="px-2 py-1 text-left text-white">Food</th>
          <th className="px-2 py-1 text-left">Meal</th>
          <th className="px-2 py-1 text-left">Quantity</th>
        </tr>
      </thead>
      <tbody className="text-black">
        {items.map((item, i) => (
          <tr key={i} className="border-b">
            <td className="px-2 py-1">{item.food}</td>
            <td className="px-2 py-1">{item.mealType}</td>
            <td className="px-2 py-1">{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
