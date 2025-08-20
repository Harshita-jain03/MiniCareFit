// page.tsx (Account)
'use client';

import { useEffect, useState } from 'react';

type Profile = {
  id: number;
  username: string;
  email: string | null;
  role: string;
  image?: string | null;
  age?: number | null;
  gender?: string | null;
  date_joined?: string | null;
  last_login?: string | null;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-3">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-black">{value}</div>
    </div>
  );
}

function authHeaders(): HeadersInit {
  const raw =
    (typeof window !== 'undefined' &&
      (localStorage.getItem('token') || localStorage.getItem('accessToken'))) ||
    '';
  if (!raw) return {};
  const token = raw.startsWith('Bearer ') ? raw : `Bearer ${raw}`;
  return { Authorization: token };
}

// ✅ inline SVG placeholder (square) – no network call
const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-size="20" font-family="Arial,Helvetica,sans-serif" fill="#9ca3af">
      Avatar
    </text>
  </svg>`);

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/my_account', {
          headers: authHeaders(),
          cache: 'no-store',
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Profile = await res.json();
        setProfile(data);
      } catch (e) {
        console.error(e);
        setMsg('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const roleBadge =
    profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'User';
  const joined = profile?.date_joined ? new Date(profile.date_joined).toLocaleString() : '-';
  const lastLogin = profile?.last_login ? new Date(profile.last_login).toLocaleString() : '-';

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Account</h1>

      {loading ? (
        <div className="space-y-4">
          <div className="w-40 h-40 bg-gray-200 animate-pulse rounded-xl" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
        </div>
      ) : !profile ? (
        <p className="text-red-600">{msg || 'No user found.'}</p>
      ) : (
        <>
          {/* Square avatar with robust fallback */}
          <div className="flex justify-center mb-5">
            <img
              src={profile.image || DEFAULT_AVATAR}
              alt="avatar"
              className="w-40 h-40 rounded-xl object-cover border"
              onError={(e) => {
                // if backend image 404s, fall back to inline SVG
                (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-center mb-6">
            <div className="text-xl font-semibold text-black">{profile.username}</div>
            <div className="mt-1 inline-block text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {roleBadge}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="User ID" value={String(profile.id)} />
            <Field label="Username" value={profile.username} />
            <Field label="Email" value={profile.email || '-'} />
            <Field label="Gender" value={profile.gender || '-'} />
            <Field label="Age" value={profile.age != null ? String(profile.age) : '-'} />
            <Field label="Date Joined" value={joined} />
            <Field label="Last Login" value={lastLogin} />
          </div>
        </>
      )}
    </div>
  );
}
