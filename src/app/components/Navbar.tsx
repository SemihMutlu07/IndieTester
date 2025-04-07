"use client";

import Link from "next/link";
import {useEffect, useState} from 'react';
import {auth} from '../services/firebase';
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // value declared but never used hatasını böyle çözebildik, çünkü şu an read
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      {/* Logo or App Name */}
      <Link href="/" className="text-2xl font-bold tracking-wide hover:text-blue-400 transition">
        IndieTester
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        {user && (
          <>
            <Link href="/tester" className="hover:text-blue-400 transition">
              Tester Panel
            </Link>
            <Link href="/developer" className="hover:text-blue-400 transition">
              Developer Dashboard
            </Link>
          </>
        )}

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-sm">
              Welcome, <span className="font-semibold">{user.email}</span>
            </p>
            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 transition px-3 py-1 rounded text-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
