import "./globals.css";

export const metadata = {
  title: "Dash",
  description: "Simple Next.js + Tailwind dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 max-h-screen">{children}</body>
    </html>
  );
}

