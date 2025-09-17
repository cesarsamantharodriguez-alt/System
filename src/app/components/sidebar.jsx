"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-800 text-white h-screen p-6">
      <h2 className="text-xl font-bold mb-6 text-white">
        Housing Project
      </h2>
      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="block px-2 py-1 rounded hover:bg-green-700 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/settings"
          className="block px-2 py-1 rounded hover:bg-green-700 transition"
        >
          Settings
        </Link>
        <Link
          href="/profile"
          className="block px-2 py-1 rounded hover:bg-green-700 transition"
        >
          Profile
        </Link>
        <Link
          href="/data"
          className="block px-2 py-1 rounded hover:bg-green-700 transition"
        >
          Data
        </Link>
        <Link
          href="/user"
          className="block px-2 py-1 rounded hover:bg-green-700 transition"
        >
          User
        </Link>
      </nav>
    </aside>
  );
}
