"use client";

import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/choose-role");
      }
    });
    return () => unsubscribe();
  }, [router]);
  
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if(isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-accent text-deep-dark p-6'>
      <h1 className='text-3xl font-bold mb-6'>{isRegistering ? 'Register' : "Login"} to IndieTester</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleEmailAuth} className="flex flex-col w-full max-w-md space-y-4 mb-4">
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='p-2 border border-dark rounded'
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='p-2 border border-dark rounded'
          required
        />
        <button 
          type="submit" 
          className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      
      <button 
        onClick={handleGoogleLogin}
        className="flex items-center justify-center bg-white text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-100 w-full max-w-md"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Sign in with Google
      </button>
      
      <div className="mt-4">
        <button 
          onClick={() => setIsRegistering(!isRegistering)} 
          className="text-primary hover:underline"
        >
          {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}