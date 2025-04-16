// Small change to trigger Vercel redeploy


"use client";

import { useState } from "react";

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.text();
      setResponse(data);
    } catch (err) {
      console.error("Error:", err);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="What do you want to write?"
        className="w-full p-3 border border-gray-300 rounded-md text-black"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        disabled={loading || !input.trim()}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {response && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50 text-black whitespace-pre-wrap">
          {response}
        </div>
      )}
    </form>
  );
}
