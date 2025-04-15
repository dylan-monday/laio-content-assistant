export const metadata = {
  title: "LA.IO Write",
  description: "A custom brand voice assistant for LA.IO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}