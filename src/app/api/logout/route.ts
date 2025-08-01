import { clearToken } from "@/src/lib/auth/server";

export async function POST() {
console.log("[Logout API] Clearing cookies");

  return clearToken(); // deletes both token + refreshToken
  
}
