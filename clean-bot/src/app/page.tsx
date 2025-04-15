import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to LA.IO Write</h1>
      <ChatUI />
    </main>
  );
}