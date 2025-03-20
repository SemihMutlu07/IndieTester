
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

export default function HomePage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-accent text-deep-dark p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Indie Tester!</h1>

      <div className="flex gap-4">
      </div>
    </div>
    
  );
}
