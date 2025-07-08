"use client";
import { useState } from "react";
import { FaCalendarAlt, FaCalculator, FaStopwatch } from "react-icons/fa";
import Stopwatch from "./stopWatch";
import Calculator from "./calculator";


export default function ToolsPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const result = w / (h * h);
    setBmi(result.toFixed(2));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl text-blue-500 font-bold">Tools</h1>

      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BMI Box */}
        <div className="bg-white ml-6 rounded-xl shadow-lg p-6 space-y-6 max-w-sm height-full">
          <h2 className="text-xl text-blue-600 font-semibold text-center">BMI</h2>

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full text-black border border-gray-300 rounded px-3 py-2"
          />

          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border text-black border-gray-300 rounded px-3 py-2"
          />

          <button
            onClick={calculateBMI}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded w-full font-medium"
          >
            Calculate
          </button>

          {bmi && (
            <div className="text-center mt-2 text-blue-600 font-medium">
              Your BMI: <span className="font-bold text-black">{bmi}</span>
            </div>
          )}
        </div>

        {/* Tools Icons */}
        
        <div className=" row-span-6 lg:grid-cols-2 shadow-lg  justify-center  place-items-center text-6xl text-gray-700">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
            
            <div className="">
                <Calculator />
                {/* Stopwatch */}
            </div>
        {/* </div> */}
        </div>
        <div className=" shadow-lg ml-6 p-6 space-y-4 max-w-sm place-items-center  text-gray-700">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> */}
            <div>
                {/* Your BMI form */}
            </div>
            <div className="space-y-4">
                <Stopwatch />
                {/* Other icons or tools */}
            {/* </div> */}
        </div>
          
          
        </div>
      </div>
    </div>
  );
}
