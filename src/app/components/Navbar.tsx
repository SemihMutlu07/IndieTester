"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      {/* Logo or App Name */}
      <Link href="/" className="text-2xl font-bold tracking-wide hover:text-blue-400 transition">
        IndieTester
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        {session && (
          <>
            {session.user?.role === "admin" && (
              <Link
                href="/admin"
                className="hover:text-blue-400 transition"
              >
                Admin Dashboard
              </Link>
            )}

            {session.user?.role === "developer" && (
              <Link
                href="/developer"
                className="hover:text-blue-400 transition"
              >
                Developer Dashboard
              </Link>
            )}

            {session.user?.role === "tester" && (
              <Link
                href="/tester"
                className="hover:text-blue-400 transition"
              >
                Tester Panel
              </Link>
            )}
          </>
        )}

        {/* Auth Section */}
        {session ? (
          <div className="flex items-center gap-4">
            <p className="text-sm">
              Welcome, <span className="font-semibold">{session.user?.name}</span> (
              {session.user?.role})
            </p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-600 transition px-3 py-1 rounded text-sm"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
