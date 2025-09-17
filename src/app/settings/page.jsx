"use client";

import { useState, useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.classList.toggle("dark", selectedTheme === "dark");
  };

  return (
    <main className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div
          className={`p-6 flex-1 overflow-auto ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
              : "bg-gradient-to-br from-green-50 to-green-100 text-green-900"
          }`}
        >
          <h1 className="text-3xl font-extrabold mb-8">⚙️ Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div className="rounded-2xl bg-white shadow-lg p-6 border border-green-200 text-black hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-semibold mb-6 text-green-900">👤 Profile Settings</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-green-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-green-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Save Profile
                </button>
              </form>
            </div>

            {/* Account */}
            <div className="rounded-2xl bg-white shadow-lg p-6 border border-green-200 text-black hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-semibold mb-6 text-green-900">🔒 Account</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-green-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-green-700">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Theme Preferences */}
            <div className="rounded-2xl bg-white shadow-lg p-6 border border-green-200 text-black hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-semibold mb-6 text-green-900">🎨 Theme Preferences</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => changeTheme("light")}
                  className={`flex-1 p-3 rounded-lg border transition ${
                    theme === "light"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Light Mode
                </button>
                <button
                  onClick={() => changeTheme("dark")}
                  className={`flex-1 p-3 rounded-lg border transition ${
                    theme === "dark"
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-white hover:bg-gray-900"
                  }`}
                >
                  Dark Mode
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button className="px-8 py-3 bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:bg-green-800 transition transform hover:scale-105">
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
