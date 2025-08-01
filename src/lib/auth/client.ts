export async function loginUser(username: string, password: string) {
  const res = await fetch("http://localhost:8000/users/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const { access, refresh } = await res.json();

  // Store tokens securely
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  return { access, refresh };
}
