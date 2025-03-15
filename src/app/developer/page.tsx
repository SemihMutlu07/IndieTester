"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';


export default function DeveloperRole() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
      <p>Manage your games here.</p>
      <a href="/developer/add" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
        Add New Game
      </a>
    </div>
  );
}