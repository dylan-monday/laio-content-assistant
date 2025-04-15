"use client";

import { useState } from "react";

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    setResponse(""); // Clear old response
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let finalText = "";

    while (true) {
      const { value, done } = await reader!.read();
      if (done) break;
      finalText += decoder.decode(value);
      setResponse(finalText);
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        placeholder="What do you want to write?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md text-black"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate
      </button>
      {response && (
        <div className="bg-gray-100 text-black p-4 rounded-lg mt-4 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}
