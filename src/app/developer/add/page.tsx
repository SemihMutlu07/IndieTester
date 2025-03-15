"use client";

import { useState } from "react";
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddGamePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      await addDoc(collection(db, "games"), {
        name,
        description,
        createdAt: new Date().toISOString(),
      });
      alert("Game Added successfully!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error adding game: ", error);
      alert("Failed to add game.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-w-md mx-auto bg-dark shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Game</h2>
      <input
        type="text"
        placeholder="Game Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-3 py-2 rounded"
        required
      />
      <button type="submit" className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition">
        {loading ? "Adding..." : "Add Game"}
      </button>
    </form>
  );
}
