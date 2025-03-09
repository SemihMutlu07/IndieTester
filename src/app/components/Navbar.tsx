"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">My App</h1>
      {session ? (
        <div className="flex gap-4">
          <p>Welcome, {session.user?.name} ({session.user?.role})</p>
          <button onClick={() => signOut()} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => signIn()} className="bg-blue-500 px-3 py-1 rounded">
          Login
        </button>
      )}
    </nav>
  );
}
