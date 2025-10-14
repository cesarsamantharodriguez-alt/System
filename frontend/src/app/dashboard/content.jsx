"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const lineData = [
  { name: "Jan", Reach: 50, Paid: 35, Organic: 15 },
  { name: "Feb", Reach: 80, Paid: 60, Organic: 20 },
  { name: "Mar", Reach: 90, Paid: 65, Organic: 25 },
  { name: "Apr", Reach: 100, Paid: 70, Organic: 30 },
  { name: "May", Reach: 85, Paid: 55, Organic: 30 },
  { name: "Jun", Reach: 120, Paid: 80, Organic: 40 },
  { name: "Jul", Reach: 185, Paid: 133, Organic: 85 },
  { name: "Aug", Reach: 160, Paid: 120, Organic: 60 },
  { name: "Sep", Reach: 190, Paid: 140, Organic: 70 },
  { name: "Oct", Reach: 200, Paid: 150, Organic: 80 },
  { name: "Nov", Reach: 210, Paid: 160, Organic: 90 },
  { name: "Dec", Reach: 230, Paid: 170, Organic: 100 },
];

const pieData = [
  { name: "Male", value: 68, color: "#3B82F6" },
  { name: "Female", value: 38, color: "#FBBF24" },
  { name: "Other", value: 12, color: "#9CA3AF" },
];

const channelData = [
  { name: "Facebook", visits: 124000, growth: "+12%" },
  { name: "Instagram", visits: 124000, growth: "+12%" },
  { name: "LinkedIn", visits: 124000, growth: "+12%" },
  { name: "YouTube", visits: 124000, growth: "+12%" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F7FBE9] text-gray-800">
    

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow text-center hover:shadow-lg transition">
            <p className="text-gray-500 text-sm mb-1">Total Reach</p>
            <h2 className="text-3xl font-extrabold text-gray-800">150K</h2>
          </div>
          <div className="bg-[#E8FCE3] rounded-2xl p-6 shadow text-center hover:shadow-lg transition">
            <p className="text-gray-500 text-sm mb-1">Total Paid Reach</p>
            <h2 className="text-3xl font-extrabold text-gray-800">115K</h2>
          </div>
          <div className="bg-[#F1FAE5] rounded-2xl p-6 shadow text-center hover:shadow-lg transition">
            <p className="text-gray-500 text-sm mb-1">Total Organic Reach</p>
            <h2 className="text-3xl font-extrabold text-gray-800">35K</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow p-6 xl:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Reach Overview
              </h2>
              <div className="flex space-x-2">
                {["Daily", "Weekly", "Monthly"].map((label, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      label === "Daily"
                        ? "bg-lime-400 text-gray-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Reach"
                  stroke="#84CC16"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Paid"
                  stroke="#60A5FA"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Organic"
                  stroke="#EC4899"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Demographic
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={70}
                    innerRadius={40}
                    paddingAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-around text-sm text-gray-600 mt-3">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Top Channels
              </h2>
              {channelData.map((ch, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center mb-3 p-3 bg-[#F9FBE7] rounded-lg"
                >
                  <span className="font-medium">{ch.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 text-sm">
                      {ch.visits.toLocaleString()}
                    </span>
                    <span className="bg-lime-400 px-2 py-1 rounded text-xs font-semibold">
                      {ch.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
