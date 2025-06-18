"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("login/admin");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-200 to-green-300">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
        Welcome to MiniCareFit
      </h1>
      <p className="text-lg md:text-xl text-white mb-8">
        Helping Kids Build Healthy Habits
      </p>
      <div className="w-40 h-40 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl">
        😊
      </div>
      <button
        onClick={() => router.push("/login")}
        className="mt-10 text-white underline text-sm"
      >
        Skip
      </button>
    </div>
  );
}
