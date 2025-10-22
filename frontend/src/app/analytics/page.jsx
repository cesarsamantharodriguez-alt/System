"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("7days");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("overview");
  const [isClient, setIsClient] = useState(false); 
  const [growthRate, setGrowthRate] = useState(0);


  useEffect(() => {
    setIsClient(true);
  }, []);


  const generateData = (days) => {
    return Array.from({ length: days }, (_, i) => ({
      day: `Day ${i + 1}`,
      users: Math.floor(Math.random() * 100 + 50),
      posts: Math.floor(Math.random() * 80 + 30),
      engagement: Math.floor(Math.random() * 70 + 20),
    }));
  };

  useEffect(() => {
    if (isClient) {
      if (filter === "7days") setData(generateData(7));
      else if (filter === "30days") setData(generateData(30));
      else setData(generateData(90));


      setGrowthRate(Math.floor(Math.random() * 40 - 10));
    }
  }, [filter, isClient]);

  if (!isClient) {

    return (
      <main className="flex w-full h-screen bg-white text-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1 p-6 overflow-auto">
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </main>
    );
  }


  const totalUsers = data.reduce((acc, d) => acc + d.users, 0);
  const totalPosts = data.reduce((acc, d) => acc + d.posts, 0);
  const avgEngagement = (
    data.reduce((acc, d) => acc + d.engagement, 0) / data.length || 0
  ).toFixed(1);

  const COLORS = ["#D8F3A2", "#4FD1C5", "#63B3ED", "#F6AD55"];


  const filteredData = data.filter((item) =>
    item.day.toLowerCase().includes(search.toLowerCase())
  );


  const exportCSV = () => {
    const csvContent = [
      ["Day", "Users", "Posts", "Engagement (%)"],
      ...data.map((d) => [d.day, d.users, d.posts, d.engagement]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "analytics_report.csv";
    link.click();
  };

  return (
    <main className="flex w-full h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6 overflow-auto">
        <Header />
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📊 Analytics
        </h1>


        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <input
            type="text"
            placeholder="🔍 Search by day..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-black w-full md:w-1/4"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-black"
          >
            <option value="overview">Overview</option>
            <option value="users">User Growth</option>
            <option value="posts">Post Engagement</option>
            <option value="communities">Community Activity</option>
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-black"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="alltime">All Time</option>
          </select>
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-[#D8F3A2] text-gray-900 rounded-lg hover:bg-[#c7e689] transition"
          >
            📤 Export CSV
          </button>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <div className="bg-[#D8F3A2] rounded-xl p-4 shadow-md">
            <h2 className="text-sm text-gray-700">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p
              className={`text-sm ${
                growthRate >= 0 ? "text-green-700" : "text-red-600"
              }`}
            >
              {growthRate >= 0 ? "▲" : "▼"} {Math.abs(growthRate)}% from last
              period
            </p>
          </div>
          <div className="bg-[#D8F3A2] rounded-xl p-4 shadow-md">
            <h2 className="text-sm text-gray-700">Total Posts</h2>
            <p className="text-2xl font-bold">{totalPosts}</p>
            <p className="text-sm text-gray-600">Active posts in range</p>
          </div>
          <div className="bg-[#D8F3A2] rounded-xl p-4 shadow-md">
            <h2 className="text-sm text-gray-700">Avg Engagement</h2>
            <p className="text-2xl font-bold">{avgEngagement}%</p>
            <p className="text-sm text-gray-600">Engagement rate</p>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl border p-4 shadow">
            <h3 className="font-semibold mb-2">📈 User Growth Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#4FD1C5"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


          <div className="bg-white rounded-xl border p-4 shadow">
            <h3 className="font-semibold mb-2">📊 Post Engagement</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#4FD1C5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>


          <div className="bg-white rounded-xl border p-6 shadow lg:col-span-2">
            <h3 className="font-semibold mb-4 text-gray-800">
               Engagement Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Likes", value: 45 },
                    { name: "Comments", value: 25 },
                    { name: "Shares", value: 20 },
                    { name: "Saves", value: 10 },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={5}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  <Cell fill="#A7D477" />
                  <Cell fill="#78C091" />
                  <Cell fill="#53A48F" />
                  <Cell fill="#2E8B57" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{ marginTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 sm:grid-cols-4 text-center mt-4">
              <div>
                <p className="text-sm text-gray-600">👍 Likes</p>
                <p className="font-bold text-gray-800">45%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">💬 Comments</p>
                <p className="font-bold text-gray-800">25%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">🔁 Shares</p>
                <p className="font-bold text-gray-800">20%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">💾 Saves</p>
                <p className="font-bold text-gray-800">10%</p>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-6 bg-white border rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">📋 Analytics Data Table</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Day</th>
                <th className="p-2">Users</th>
                <th className="p-2">Posts</th>
                <th className="p-2">Engagement (%)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.day} className="border-b hover:bg-gray-50">
                  <td className="p-2">{row.day}</td>
                  <td className="p-2">{row.users}</td>
                  <td className="p-2">{row.posts}</td>
                  <td className="p-2">{row.engagement}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}


 
