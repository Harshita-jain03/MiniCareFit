"use client";
import { useState, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
  let interval: NodeJS.Timeout | undefined;

  if (isRunning) {
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [isRunning]);


const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-sm">
      <h2 className="text-xl text-blue-600 font-semibold text-center">Stopwatch</h2>

      <div className="text-3xl text-gray-600 font-mono text-center">{formatTime(time)}</div>

      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="bg-green-600 text-white px-4 py-2 rounded font-medium"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 text-white px-4 py-2 rounded font-medium"
          >
            Stop
          </button>
        )}
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
