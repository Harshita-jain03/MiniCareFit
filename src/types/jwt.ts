export interface UserPayload {
  user_id: number;       // Unique user ID
  username: string;      // User's username
  role: string;          // "Parent", "Child", "Admin", etc.
  exp: number;           // Expiration time (required for token validity check)
}
