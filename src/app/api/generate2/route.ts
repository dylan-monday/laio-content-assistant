// new deploy test

// File: src/app/api/generate2/route.ts

export const runtime = "nodejs";

import { OpenAI } from "openai";
import { buildPrompt } from "@/lib/promptBuilder";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
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
