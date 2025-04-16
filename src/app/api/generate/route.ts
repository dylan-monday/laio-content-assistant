import { OpenAI } from "openai";
import { buildPrompt } from "@/lib/promptBuilder";

export const runtime = "nodejs";

console.log("OPENAI_API_KEY present:", Boolean(process.env.OPENAI_API_KEY));

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing");
  throw new Error("OPENAI_API_KEY not set in environment variables.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are a helpful, on-brand writing assistant.",
      },
      {
        role: "user",
        content: buildPrompt(prompt),
      },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(
          encoder.encode(chunk.choices[0]?.delta?.content || "")
        );
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
