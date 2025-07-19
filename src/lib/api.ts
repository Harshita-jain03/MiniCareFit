// src/lib/api/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type RequestOptions = RequestInit & {
  withAuth?: boolean;
};

const api = async (endpoint: string, options: RequestOptions = {}) => {
  const { withAuth, headers, ...rest } = options;

//   const finalHeaders: HeadersInit = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     ...headers,
//   };
const finalHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
  ...(headers as Record<string, string>),
};


  // Attach token from localStorage if needed
  if (withAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: finalHeaders,
    credentials: "include",
    ...rest,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API error");
  }

  return data;
};

export default api;
