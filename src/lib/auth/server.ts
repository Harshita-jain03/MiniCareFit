// src/lib/api/server.ts
const BASE_URL = process.env.INTERNAL_API_URL || "http://localhost:8000/api";

export const serverApi = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Server API error");
  }

  return data;
};
