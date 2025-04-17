"use client";

import { useState, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [refineTargetIndex, setRefineTargetIndex] = useState<number | null>(null);
  const [refineInput, setRefineInput] = useState("");

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("laio-chat");
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // Persist messages
  useEffect(() => {
    localStorage.setItem("laio-chat", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.text();
      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setRefineTargetIndex(null);
      setRefineInput("");
    }
  };

  const handleRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineInput.trim() || refineTargetIndex === null) return;

    const originalMessage = messages[refineTargetIndex];
    const refinedPrompt = `Refine the following output based on this instruction:\n\nInstruction: ${refineInput}\n\nOriginal Output:\n${originalMessage.content}`;

    setMessages((prev) => [...prev, { role: "user", content: refineInput }]);
    setRefineInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: refinedPrompt }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.text();
      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setRefineTargetIndex(null);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
    setRefineInput("");
    setRefineTargetIndex(null);
    localStorage.removeItem("laio-chat");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
  placeholder="What do you want to write?"
  className="w-full p-3 border border-gray-300 rounded-md text-black shadow-md focus:shadow-lg transition-shadow"
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-[#07233C] hover:bg-[#0a2e4f] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            Clear chat
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-md whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-gray-100 text-black"
                : "bg-blue-100 text-blue-900"
            }`}
          >
            <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
            {msg.content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}

            {msg.role === "assistant" && refineTargetIndex !== idx && (
              <button
                onClick={() => setRefineTargetIndex(idx)}
                className="mt-2 text-sm text-blue-600 hover:underline block"
              >
                Refine this response
              </button>
            )}

            {refineTargetIndex === idx && (
              <form onSubmit={handleRefineSubmit} className="mt-4 space-y-2">
                <label className="text-sm text-gray-600 block">
                  How would you like to refine this response?
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  value={refineInput}
                  onChange={(e) => setRefineInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={loading || !refineInput.trim()}
                >
                  Submit refinement
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* Branded footer */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl text-center">
  <a
    href="https://mondayandpartners.com"
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-[#18181d] text-white text-[7pt] px-4 py-1 rounded-sm font-karla"
  >
    <span className="tracking-widest">A Creativity Product From</span>
    <span className="inline-block w-2" /> 
    <span className="font-extrabold tracking-[0.5em]">MONDAY </span>
    <span className="font-normal tracking-[0.5em]">+ PARTNERS</span>
  </a>
</footer>

    </>
  );
}
