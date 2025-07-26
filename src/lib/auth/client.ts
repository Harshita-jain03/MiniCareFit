// src/lib/auth/client.ts

/**
 * For JSON-based requests
 */
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  includeAuth: boolean = true
): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (includeAuth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
}

/**
 * For FormData-based requests (e.g., file uploads, student register)
 */
export async function formFetch(
  url: string,
  formData: FormData,
  method: "POST" | "PATCH" = "POST"
): Promise<Response> {
  return fetch(url, {
    method,
    body: formData,
    // Do NOT set Content-Type — browser will set correct multipart/form-data boundaries
  });
}

/**
 * Specific: Register student from admin (POST to proxy route)
 */
export async function registerStudentFromAdmin(
  formData: FormData
): Promise<Response> {
  return formFetch("/admin/student/register", formData, "POST");
}
