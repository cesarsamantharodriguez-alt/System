"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Sun, Moon, User } from "lucide-react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState("");
  const [strength, setStrength] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };


  const checkStrength = (value) => {
    if (value.length < 6) setStrength("Weak");
    else if (/[A-Z]/.test(value) && /\d/.test(value)) setStrength("Strong");
    else setStrength("Moderate");
  };


  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    showToast("✅ Profile Updated Successfully!");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("❌ Passwords do not match!");
    } else {
      showToast("🔒 Password Updated Successfully!");
    }
  };

  return (
    <main className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        
        <div
          className={`p-6 flex-1 overflow-auto transition-colors duration-300 ${
    theme === "dark"
      ? "bg-gray-900 text-white"
      : "bg-white text-gray-900"
          }`}
        >
          <h1 className="text-3xl font-extrabold mb-8">Settings</h1>


          {toast && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
              {toast}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-200 text-gray-800 hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> Profile Settings
              </h2>
              <form className="space-y-4" onSubmit={handleProfileSave}>

                <div className="flex flex-col items-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center shadow-inner">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Upload Photo
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Save Profile
                </button>
              </form>
            </div>


            <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-200 text-gray-800 hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Account Security</h2>
              <form className="space-y-4" onSubmit={handlePasswordUpdate}>
                <div className="relative">
                  <label className="block text-sm text-gray-700">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkStrength(e.target.value);
                    }}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </div>
                  {password && (
                    <p
                      className={`text-sm mt-1 ${
                        strength === "Weak"
                          ? "text-red-500"
                          : strength === "Moderate"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      Strength: {strength}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-700">Confirm Password</label>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff /> : <Eye />}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Update Password
                </button>
              </form>
            </div>


            <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-200 text-gray-800 hover:shadow-2xl transition duration-300 col-span-2">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Theme Preferences</h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <span className="text-gray-700 font-medium">
                  {theme === "light" ? "Light Mode" : "Dark Mode"}
                </span>
                <button
                  onClick={toggleTheme}
                  className={`flex items-center justify-between w-20 px-1 py-1 rounded-full transition ${
                    theme === "dark" ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform ${
                      theme === "dark" ? "translate-x-10" : ""
                    }`}
                  ></div>
                  {theme === "dark" ? (
                    <Moon className="absolute right-3 text-white w-5 h-5" />
                  ) : (
                    <Sun className="absolute left-3 text-yellow-400 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>


          <div className="mt-10 flex justify-center">
            <button
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
              onClick={() => showToast(" All Settings Saved!")}
            >
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
