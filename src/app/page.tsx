// import Image from "next/image";

//ana sayfa ayrı bir component olarak oluşturulup bu page'e eklenilebilir..
//böylece use client & server side zımbırtılarını dodgelarız (bi de daha modüler olur)
//şimdilik kullanıcı girişi; veri ekleme ve alma için gerekli olduğundan ana sayfa page'ine use state hooklarını ekliyorum

"use client"
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { signUp, signIn, logOut } from './services/firebaseAuth';
import { auth } from "./services/firebase";

export default function HomePage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-accent text-deep-dark p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Indie Tester!</h1>

      <div className="flex gap-4">
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
          onClick={()=> signIn(email,password, router)

          }>
            Login
          </button>
          
          <button className="bg-dark text-white px-6 py-2 rounded hover:bg-deep-dark transition"
          onClick={()=> signUp(email,password, router)}>
            Register
          </button>
      </div>

      <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        
          <button className="bg-dark text-white px-6 py-2 rounded hover:bg-deep-dark transition"
        onClick={()=> logOut()}>
            Log Out
          </button>

        {auth.currentUser!=null ? (
        <div>
          User Email: {auth.currentUser?.email} {/* DEBUG İÇİN */}
        </div>) : null
        }
    </div>
    
  );
}
