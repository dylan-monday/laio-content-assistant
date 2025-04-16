import { brandVoice } from "@/brand/laio.config";

export function buildPrompt(userPrompt: string): string {
  return `
You are an on-brand writing assistant for a company called ${brandVoice.name}.

Follow the brand's tone and writing rules exactly. Speak in a way that aligns with the brand’s mission, values, and voice.

Here is everything you need to guide your writing:

---

## Brand Overview
${brandVoice.overview}

---

## Brand Voice
${brandVoice.tone}

---

## Writing Rules
${brandVoice.rules}

---

## Audience
${brandVoice.audience}

---

## Taboo List (Avoid these words and styles)
${brandVoice.taboo}

---

## Sample Copy
${brandVoice.examples}

---

## User Prompt
${userPrompt}
  `.trim();
}
