"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  DoughnutChart, 
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Mail, Phone, MapPin, Github } from "lucide-react";

const activityData = [
  { month: "Jan", activity: 5 },
  { month: "Feb", activity: 5 },
  { month: "Mar", activity: 5 },
  { month: "Apr", activity: 5 },
  { month: "May", activity: 5 },
  { month: "Jun", activity: 40 },
  { month: "Jul", activity: 44 },
  { month: "Aug", activity: 45 },
  { month: "Sept", activity: 50 },
  { month: "Oct", activity: 50 },
  { month: "Nov", activity: 50 },
  { month: "Dec", activity: 10 },
];

const skillsData = [
  { name: "Frontend", value: 40 },
  { name: "Backend", value: 20 },
  { name: "Database", value: 20 },
  { name: "Networking", value: 50 },
  { name: "Other", value: 10 },
];

const COLORS = [
  "#0a66c2", 
  "#0d8af0",
  "#4bb3fd",
  "#92d5ff",
  "#cfeeff",
];

export default function Profile() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: "Samantha Cesar",
    tagline: "Aspiring Full-Stack Developer",
    title: "4th Year IT Student",
    subtitle: "OJT",
    email: "samantha@test.com",
    phone: "+63 912 345 6789",
    location: "Quezon City",
    github: "https://github.com/cesarsamantharodriguez-alt/System",
    education:
      "Bachelor of Science in Information Technology at Quezon City University",
  });

  const [editing, setEditing] = useState(false);

  function handleLogout() {
    localStorage.removeItem("role");
    router.replace("/");
  }

  function toggleEdit() {
    setEditing(!editing);
  }

  return (
    <main className="flex w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-8 flex-1 overflow-auto animate-fade-in">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">
            Profile Overview
          </h1>

          <div className="rounded-2xl bg-white shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition duration-300 max-w-4xl mx-auto mb-10 transform hover:scale-[1.01]">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src="/image/profile.jpg"
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-900"
              />
              <div className="flex-1">
                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-2xl"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h2>
                )}

                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full mt-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={profile.tagline}
                    onChange={(e) =>
                      setProfile({ ...profile, tagline: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-600 italic mt-1">
                    {profile.tagline}
                  </p>
                )}

                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full mt-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-500">{profile.title}</p>
                )}

                <p className="text-sm text-gray-400">{profile.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
                  <Mail size={16} /> Email
                </p>
                {editing ? (
                  <input
                    type="email"
                    className="border rounded-lg p-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium text-gray-700">{profile.email}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
                  <Phone size={16} /> Phone
                </p>
                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium text-gray-700">{profile.phone}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
                  <MapPin size={16} /> Location
                </p>
                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium text-gray-700">{profile.location}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
                  <Github size={16} /> GitHub / Portfolio
                </p>
                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={profile.github}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                  />
                ) : (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {profile.github}
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={toggleEdit}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 shadow-md transition"
            >
              {editing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                Activity Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#000", fontSize: 12 }} />
                  <YAxis
                    label={{
                      value: "Hours Logged",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#000",
                    }}
                    tick={{ fill: "#000" }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#0a66c2"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                Skills Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillsData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    label
                  >
                    {skillsData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-white shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Progress</h2>
            <div className="space-y-4">
              {[
                { name: "Capstone Project", progress: 75, status: "In Progress" },
                { name: "Web Development Skills", progress: 90, status: "Completed" },
                { name: "Database Management", progress: 60, status: "In Progress" },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm font-semibold text-gray-700">
                    <p>{item.name}</p>
                    <p>
                      {item.progress}% ({item.status})
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                    <div
                      className="bg-blue-600 h-4 rounded-full transition-all duration-700"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="mt-10 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
