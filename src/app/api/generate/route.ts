import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/lib/promptBuilder";

export const runtime = "nodejs"; // Can also be 'edge' if you've set that up

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const prompt = buildPrompt(input);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content ?? "No response.";

    return NextResponse.json({ result: response });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
