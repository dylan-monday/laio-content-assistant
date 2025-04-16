import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve directory reliably
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandPath = (file: string) => path.join(__dirname, file);


export const brandVoice = {
  name: "LA.IO",
  tone: fs.readFileSync(brandPath("brand-voice.md"), "utf8"),
  rules: fs.readFileSync(brandPath("writing-rules.md"), "utf8"),
  audience: fs.readFileSync(brandPath("audience.md"), "utf8"),
  examples: fs.readFileSync(brandPath("sample-copy.md"), "utf8"),
  taboo: fs.readFileSync(brandPath("taboo-list.md"), "utf8"),
  overview: fs.readFileSync(brandPath("brand-overview.md"), "utf8"),
};
