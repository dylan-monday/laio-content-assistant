import fs from "fs";
import path from "path";

const brandPath = (file: string) => {
  const fullPath = path.join(process.cwd(), "public", "brand", file);
  console.log("🔍 Looking for brand file at:", fullPath);
  return fullPath;
};

export const brandVoice = {
  name: "LA.IO",
  tone: fs.readFileSync(brandPath("brand-voice.md"), "utf-8"),
  rules: fs.readFileSync(brandPath("writing-rules.md"), "utf-8"),
  audience: fs.readFileSync(brandPath("audience.md"), "utf-8"),
  examples: fs.readFileSync(brandPath("sample-copy.md"), "utf-8"),
  taboo: fs.readFileSync(brandPath("taboo-list.md"), "utf-8"),
  overview: fs.readFileSync(brandPath("brand-overview.md"), "utf-8"),
};
