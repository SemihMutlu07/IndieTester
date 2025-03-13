"use client";

import { useState } from "react";

export default function TesterPage() {
  const [comment, setComment] = useState("");

  const submitFeedback = async () => {
    const gameId = 1; // static for now, will be dynamic later
    
    const response = await fetch("/api/tester/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, comment }),
    });

    if (response.ok) {
      alert("Feedback submitted!");
      setComment("");
    } else {
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Discover New Games</h1>

      <div className="border p-4 mb-4 rounded">
        <h2 className="text-lg font-semibold">Sample Game</h2>
        <p>This is a test game description.</p>

        <textarea
          placeholder="Leave your feedback"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border px-3 py-2 rounded w-full mt-2"
        />

        <button
          onClick={submitFeedback}
          className="bg-blue-500 px-4 py-2 rounded mt-2 text-white"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}