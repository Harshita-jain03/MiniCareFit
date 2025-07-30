'use client';

import { useEffect, useState } from 'react';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/admin/my_account');
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error || 'Failed to fetch user');
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError('Something went wrong');
        console.error('[AccountPage] Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {/* Add more fields here if available */}
    </div>
  );
}
