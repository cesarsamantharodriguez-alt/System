"use client";
import Link from "next/link";
import { Home, Inbox, Users, BarChart3, Folder, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#D8F3A2] text-green-900 h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-extrabold mb-8">Dash</h2>
        <nav className="space-y-2">
          <p className="uppercase text-xs text-gray-700 font-semibold mb-2">Main Menu</p>
          <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <Home size={18} /> Dashboard
          </Link>
          <Link href="/inbox" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <Inbox size={18} /> Inbox
            <span className="ml-auto bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">7</span>
          </Link>

          <p className="uppercase text-xs text-gray-700 font-semibold mt-4 mb-2">Workspace</p>
          <Link href="/accounts" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <Users size={18} /> Accounts
          </Link>
          <Link href="/schedule" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <BarChart3 size={18} /> Schedule Post
          </Link>
          <Link href="/communities" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <Folder size={18} /> Communities
          </Link>
          <Link href="/analytics" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <BarChart3 size={18} /> Analytics
          </Link>

          <p className="uppercase text-xs text-gray-700 font-semibold mt-4 mb-2">General</p>
          <Link href="/files" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <Folder size={18} /> File & Folders
          </Link>
          <Link href="/settings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-200 transition">
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </div>

      <div className="mt-6 bg-green-900 text-white p-3 rounded-xl text-center">
        <p className="text-sm mb-1">Need Help with Dash?</p>
        <button className="bg-[#C4F1A3] text-green-900 font-bold text-sm px-3 py-1 rounded-lg hover:bg-white">
          Go to help center
        </button>
      </div>
    </aside>
  );
}
