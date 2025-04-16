import Image from "next/image";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-10 max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <Image
          src="/images/la.io.png"
          alt="LA.IO Logo"
          width={300}
          height={80}
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">LA.IO Writing Assistant</h1>

      <ChatUI />
    </main>
  );
}
