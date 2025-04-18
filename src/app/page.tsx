'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from '../firebase/db';

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await getIdTokenResult(user, true); // force refresh
          const userRole = idTokenResult.claims.role || 'No role';
          setRole(userRole);
          setEmail(user.email); // ✅ Set email from the user object
        } catch (err) {
          console.error('Error getting user claims:', err);
        }
      } else {
        setRole(null); // Not logged in
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Welcome to the Home Page 👋</h1>
      {role && email ? (
        <div className="text-center text-lg">
          <p>📧 <strong>Email:</strong> {email}</p>
          <p>🧑‍💼 <strong>Role:</strong> {role}</p>
        </div>
      ) : (
        <p className="text-gray-500">Not logged in</p>
      )}
    </div>
  );
}
