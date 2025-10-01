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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

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
  "#d9ff02ff",
  "#65fc01ff",
  "#19c2d8ff",
  "#d86868ff",
  "rgba(219, 134, 181, 0.93)",
];

export default function Profile() {
  const router = useRouter();

  const [profile, setProfile] = useState({
  name: "Samantha Cesar",
  title: "4th Year IT Student",
  subtitle: "OJT",
  email: "samantha@test.com",
  phone: "+63 912 345 6789",
  location: "Quezon City",
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
  <main className="flex w-full h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
  <Sidebar />
  <div className="flex flex-col flex-1">
  <Header />
  <div className="p-8 flex-1 overflow-auto animate-fade-in">
 <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight"> Profile Overview</h1>

  <div className="rounded-2xl bg-white shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition duration-300 max-w-4xl mx-auto mb-10 transform hover:scale-105">
  <div className="flex items-center space-x-6 mb-6">
  <img
  src="/image/profile.jpg"
  alt="Profile"
        className="w-40 h-40 rounded-full object-cover mx-auto mb-4" />
     <div>
      {editing ? (
      <input
        type="text"
        className="border rounded-lg p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
        value={profile.name}
         onChange={(e) =>
         setProfile({ ...profile, name: e.target.value }) }
         />
         ) : (
        <h2 className="text-2xl font-bold text-gray-900">
        {profile.name}
        </h2>
        )}
        {editing ? (
        <input
        type="text"
        className="border rounded-lg p-2 w-full mt-2 text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
        value={profile.title}
        onChange={(e) =>
        setProfile({ ...profile, title: e.target.value })    }
           />
          ) : (
         <p className="text-gray-500">{profile.title}</p>
           )}
          {editing ? (
           <input
            type="text"
            className="border rounded-lg p-2 w-full mt-2 text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={profile.subtitle}
            onChange={(e) =>
             setProfile({ ...profile, subtitle: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm text-gray-400">{profile.subtitle}</p>
                )}
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
             <p className="text-sm text-gray-600 font-bold">📧 Email</p>
             {editing ? (
             <input
             type="email"
             className="border rounded-lg p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                <p className="text-sm text-gray-600 font-bold">📱 Phone</p>
                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                <p className="text-sm text-gray-600 font-bold">📍 Location</p>
                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                <p className="text-sm text-gray-600 font-bold">🎓 Education</p>
                {editing ? (
                  <input
                    type="text"
                    className="border rounded-lg p-2 w-full text-gray-900 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                    value={profile.education}
                    onChange={(e) =>
                      setProfile({ ...profile, education: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium text-gray-700">
                    {profile.education}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={toggleEdit}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 shadow-md transition"
            >
              {editing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-bold mb-6 text-gray-700">
                Activity Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={activityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    interval={0}
                    tick={{ fill: "#000000ff", fontSize: 12 }}
                    angle={-30}
                    textAnchor="end"
                  />
                  <YAxis
                    tick={{ fill: "#020007ff" }}
                    domain={[0, "dataMax + 10"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "2px solid black",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#3d0af3ff"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 10 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl bg-white shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-bold mb-6 text-gray-700">
                Skills Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    animationDuration={1500}
                  >
                    {skillsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "2px solid black",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-white shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-bold mb-6 text-gray-700"> Progress</h2>
            <div className="space-y-4">
              {[{ name: "Capstone Project", progress: 40 },
                { name: "Web Development Skills", progress: 50 },
                { name: "Database Management", progress: 50 },
              ].map((item, index) => (
                <div key={index}>
                  <p className="text-sm font-semibold text-gray-700">
                    {item.name}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-yellow-500 h-4 rounded-full transition-all duration-700"
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
