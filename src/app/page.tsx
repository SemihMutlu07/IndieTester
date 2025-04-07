// import Image from "next/image";

//ana sayfa ayrı bir component olarak oluşturulup bu page'e eklenilebilir..
//böylece use client & server side zımbırtılarını dodgelarız (bi de daha modüler olur)
//şimdilik kullanıcı girişi; veri ekleme ve alma için gerekli olduğundan ana sayfa page'ine use state hooklarını ekliyorum

"use client"
import { useRouter } from "next/navigation";
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  const handleJoinClick = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-accent text-deep-dark p-6 text-center">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to Indie Tester!</h1>
      <p className="text-lg max-w-xl mb-8">
        Discover. Test. Build. A new way for indie developers and passionate gamers to connect, test, and improve the next generation of games.
      </p>

      <div className="w-full max-w-md h-64 bg-deep-dark rounded-lg mb-8 flex items-center justify-center text-white text-xl">
        Image Placeholder
      </div>

      <button
        className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-secondary transition"
        onClick={handleJoinClick}
      >
        Join Indie Tester!
      </button>
    </div>
  );
}