import "./globals.css";
import { Roboto, Karla } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-karla",
});

export const metadata = {
  title: "LA.IO Content Assistant",
  icons: {
    icon: "/images/favicon.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${karla.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
