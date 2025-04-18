'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../firebase/db';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';

interface User {
  uid: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const [currentRole, setCurrentRole] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleAndUsers = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const tokenResult = await getIdTokenResult(user);
        const role = tokenResult.claims.role;
        setCurrentRole(role);

        if (role === 'superadmin') {
          const res = await fetch('/api/listUser');
          if (!res.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await res.json();
          setUsers(data.users || []); // Ensure users are present
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, fetchRoleAndUsers);
  }, []);

  const makeAdmin = async (uid: string) => {
    try {
      const res = await fetch('/api/setCustomClaims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, role: 'admin' }),
      });
      if (!res.ok) {
        throw new Error('Failed to promote user to admin');
      }
      alert('User promoted to admin');
      
      // Update users state without reloading the page
      setUsers((prevUsers) => 
        prevUsers.map((user) =>
          user.uid === uid ? { ...user, role: 'admin' } : user
        )
      );
    } catch (err: any) {
      console.error('Error promoting user:', err);
      alert('Error promoting user to admin');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (currentRole !== 'superadmin') {
    return <p className="text-red-600 font-bold">Access denied 🚫</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      {users.length === 0 ? (
        <p className="text-gray-500">No users available.</p>
      ) : (
        users.map((user) => (
          <div key={user.uid} className="border p-4 mb-2 rounded">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {user.role === 'user' && (
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() => makeAdmin(user.uid)}
              >
                Make Admin
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
