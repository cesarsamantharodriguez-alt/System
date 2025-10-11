import "./globals.css";

export const metadata = {
  title: "Housing Dashboard",
  description: "Simple Next.js + Tailwind dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}

