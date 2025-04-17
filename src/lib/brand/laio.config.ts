import fs from "fs";
import path from "path";

const brandPath = (file: string) =>
  path.join(process.cwd(), "src", "lib", "brand", file); // <- correct path

export const brandVoice = {
  name: "LA.IO",
  tone: fs.readFileSync(brandPath("brand-voice.md"), "utf-8"),
  rules: fs.readFileSync(brandPath("writing-rules.md"), "utf-8"),
  audience: fs.readFileSync(brandPath("audience.md"), "utf-8"),
  examples: fs.readFileSync(brandPath("sample-copy.md"), "utf-8"),
  taboo: fs.readFileSync(brandPath("taboo-list.md"), "utf-8"),
  overview: fs.readFileSync(brandPath("brand-overview.md"), "utf-8"),
};
