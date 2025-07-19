"use client";

export default function FoodTable() {
  const dummyData = [
    { food: "Pizza", date: "Today", calories: 500, feedback: "BAD" },
    { food: "Milk", date: "Today", calories: 1000, feedback: "GOOD" },
    { food: "Dal", date: "Today", calories: 1000, feedback: "GOOD" },
    { food: "Rice", date: "Today", calories: 1000, feedback: "GOOD" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-lg text-blue-600 font-semibold mb-2">Food History</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-400">
            <th className="p-2 text-left">Food Item</th>
            <th className="p-2 text-left">Date/Time</th>
            <th className="p-2 text-left">Calories</th>
            <th className="p-2 text-left">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 text-black">{item.food}</td>
              <td className="p-2 text-black">{item.date}</td>
              <td className="p-2 text-black">{item.calories}</td>
              <td
                className={`p-2 font-semibold ${
                  item.feedback === "GOOD" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.feedback}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
