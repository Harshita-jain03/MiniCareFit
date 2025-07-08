"use client";
import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      // Evaluate safely
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="bg-white box-content  p-4  rounded-xl shadow p-4 w-64 max-w-md mx-auto">
      <h2 className="text-xl text-blue-600 font-semibold text-center">Calculator</h2>
      <div className="border border-gray-300 rounded p-2 mb-2 text-right  text-lg min-h-[2rem]">
        {input || "0"}
      </div>
      <div className="grid grid-cols-4  gap-2">
        {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((val) => (
          <button
            key={val}
            onClick={() => (val === "=" ? handleEqual() : handleClick(val))}
            className="bg-gray-100 hover:bg-gray-200 text-lg font-medium py-2 rounded"
          >
            {val}
          </button>
        ))}
        <button
  onClick={handleClear}
  className="col-span-2 bg-red-500 hover:bg-red-600 basis-64 text-white text-lg py-2 rounded"
>
  Clear
</button>
<button
  onClick={handleDelete}
  className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-2 rounded"
>
  Delete
</button>
      </div>
    </div>
  );
}
