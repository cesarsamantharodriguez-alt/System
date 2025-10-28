"use client";

import { useState, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  Legend as ReLegend,
} from "recharts";
import { Bell, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTooltip,
  ChartLegend,
  Filler
);


const datasets = {
  daily: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    reach: [40, 55, 70, 60, 90],
    paid: [25, 30, 45, 40, 70],
    organic: [15, 25, 25, 20, 20],
  },
  weekly: {
    labels: ["Wk1", "Wk2", "Wk3", "Wk4"],
    reach: [250, 300, 280, 350],
    paid: [180, 200, 190, 220],
    organic: [70, 100, 90, 130],
  },
  monthly: {
    labels: [
      "Jan", "Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ],
    reach: [90, 95, 110, 85, 120, 95, 185, 130, 140, 160, 180, 200],
    paid: [50, 60, 55, 70, 90, 80, 133, 120, 125, 140, 160, 170],
    organic: [20, 30, 35, 45, 50, 40, 85, 60, 70, 95, 110, 120],
  },
};

const pieData = [
  { name: "Male", value: 68, color: "#3B82F6" },
  { name: "Female", value: 38, color: "#FBBF24" },
  { name: "Other", value: 12, color: "#9CA3AF" },
];

const topChannels = [
  { name: "Facebook", visits: 124000, growth: "+12%" },
  { name: "Instagram", visits: 98000, growth: "+9%" },
  { name: "LinkedIn", visits: 64000, growth: "+7%" },
  { name: "YouTube", visits: 45000, growth: "+5%" },
];

const barData = [
  { name: "Jan", Likes: 400, Shares: 240, Comments: 100 },
  { name: "Feb", Likes: 460, Shares: 220, Comments: 120 },
  { name: "Mar", Likes: 510, Shares: 300, Comments: 150 },
  { name: "Apr", Likes: 600, Shares: 350, Comments: 180 },
];

const conversionData = [{ name: "Conversion", value: 72, fill: "#A3E635" }];
const recentActivity = [
  { id: 1, action: "New post published", time: "2 mins ago" },
  { id: 2, action: "Reached 10K followers", time: "1 hour ago" },
  { id: 3, action: "Campaign 'Spring Boost' launched", time: "3 hours ago" },
];

const verticalBandPlugin = {
  id: "verticalBand",
  afterDraw: (chart) => {
    if (!chart.tooltip?._active || chart.tooltip._active.length === 0) return;
    const ctx = chart.ctx;
    const active = chart.tooltip._active[0];
    const x = active.element.x;
    const top = chart.chartArea.top;
    const bottom = chart.chartArea.bottom;
    const bandWidth = 28; 
    ctx.save();
    ctx.fillStyle = "rgba(220, 252, 231, 0.6)"; 
    ctx.fillRect(x - bandWidth / 2, top, bandWidth, bottom - top);
    ctx.restore();
  },
};

ChartJS.register(verticalBandPlugin);


export default function DashboardPage() {
  const [selectedView, setSelectedView] = useState("monthly"); 
  const [showDetail, setShowDetail] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "system",
      title: "System Update",
      message: "Dashboard data synced successfully.",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "Your teammate commented on a post.",
      time: "10m ago",
      read: false,
    },
    {
      id: 3,
      type: "analytics",
      title: "Report Ready",
      message: "Your weekly analytics report is available.",
      time: "1h ago",
      read: true,
    },
  ]);
const chartRef = useRef();
  const ds = datasets[selectedView];


  const chartData = {
    labels: ds.labels,
    datasets: [
      {
        label: "Reach",
        data: ds.reach,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.06)",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#2563eb",
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.2,
        fill: false,
        borderWidth: 3,
      },
      {
        label: "Paid Reach",
        data: ds.paid,
        borderColor: "#a3e635", 
        backgroundColor: "rgba(163,230,53,0.06)",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#a3e635",
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.2,
        fill: false,
        borderWidth: 3,
      },
      {
        label: "Organic Reach",
        data: ds.organic,
        borderColor: "#ec4899",
        backgroundColor: "rgba(236,72,153,0.06)",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#ec4899",
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.2,
        fill: false,
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top", labels: { color: "#374151" } },
      tooltip: {
        enabled: true,
        backgroundColor: "#D9F99D",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#86efac",
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          title: (t) => {
          
            return t[0]?.label ?? "";
          },
          label: (context) => {
            const v = context.parsed.y;
            return `${context.dataset.label}: ${v}K`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
      y: {
        grid: { color: "#E6E7EA", drawBorder: false },
        ticks: {
          color: "#6B7280",
          callback: (value) => (value === 0 ? "0" : `${value}K`),
        },
      },
    },
    elements: {
      point: { hoverRadius: 7 },
    },
   
  };

  return (
    <main className="flex-1 bg-[#F7FBE9] min-h-screen p-6 text-gray-800 overflow-y-auto">
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">


          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-400 focus:outline-none"
            />
          </div>


          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
            >
              <Bell className="text-gray-700" size={18} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                >
                  <div className="flex justify-between items-center p-3 border-b">
                    <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
                    <button
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((n) => ({ ...n, read: true }))
                        )
                      }
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No notifications
                    </div>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className={`px-4 py-3 text-sm border-b hover:bg-gray-50 transition ${
                            n.read ? "text-gray-500" : "text-gray-800 font-medium"
                          }`}
                          onClick={() => {
                            setNotifications((prev) =>
                              prev.map((notif) =>
                                notif.id === n.id ? { ...notif, read: true } : notif
                              )
                            );
                          }}
                        >
                          <div className="flex justify-between">
                            <span className="font-semibold">{n.title}</span>
                            <span className="text-xs text-gray-400">{n.time}</span>
                          </div>
                          <p className="text-gray-600 text-xs mt-1">{n.message}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex justify-between p-3 border-t text-xs text-gray-500">
                    <button
                      onClick={() => setNotifications([])}
                      className="hover:text-red-600 transition"
                    >
                      Clear all
                    </button>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="hover:text-blue-600 transition"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
    <Image
      src="/image/profile.jpg"
      alt="Profile Picture"
      width={40}
      height={40}
      className="object-cover w-full h-full"
      priority
    />
  </div>
  <span className="font-semibold text-gray-700">Sam Cesar</span>
</div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[{ title: "Total Reach", value: "150K" }, { title: "Total Paid Reach", value: "115K" }, { title: "Total Organic Reach", value: "35K" }].map((card, idx) => (
          <div key={idx} className="p-6 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-3xl font-extrabold mt-2">{card.value}</h2>
          </div>
        ))}
      </div>


      <div className="flex justify-end mb-4 space-x-2">
        {["daily", "weekly", "monthly"].map((view) => (
          <button
            key={view}
            onClick={() => setSelectedView(view)}
            className={`px-4 py-1 rounded-full font-medium capitalize transition ${selectedView === view ? "bg-lime-300 text-gray-900" : "bg-white border hover:bg-gray-100"}`}
          >
            {view}
          </button>
        ))}
      </div>


      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 mb-8">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold">Reach Overview</h2>
        </div>

        <div style={{ height: 340 }}>
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800"> Demographic</h2>
            <button className="text-sm text-blue-600 hover:underline" onClick={() => setShowDetail("demographic")}>
              See Detail
            </button>
          </div>
          <PieChart width={200} height={200}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
              {pieData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800"> Top Channels</h2>
            <button className="text-sm text-blue-600 hover:underline" onClick={() => setShowDetail("channels")}>
              See Detail
            </button>
          </div>

          <ul className="space-y-4">
            {topChannels.map((ch, i) => (
              <li key={i} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span>{ch.name}</span>
                <span className="bg-lime-300 px-2 py-1 rounded-full text-xs font-semibold">{ch.growth}</span>
              </li>
            ))}
          </ul>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-center">
          <h2 className="font-semibold text-gray-800 mb-4"> Conversion Rate</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" barSize={18} data={conversionData} startAngle={90} endAngle={450}>
              <RadialBar dataKey="value" />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-2xl font-bold mt-2">72%</p>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="font-semibold mb-4"> Post Engagement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Bar dataKey="Likes" fill="#3B82F6" />
              <Bar dataKey="Shares" fill="#A3E635" />
              <Bar dataKey="Comments" fill="#FBBF24" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="font-semibold mb-4"> Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.action}</span>
                <span className="text-gray-500 text-sm">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


<AnimatePresence>
  {showDetail && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl w-[90%] md:w-[650px] shadow-2xl relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >

        <button
          onClick={() => setShowDetail(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>


        <h2 className="text-2xl font-extrabold mb-4 capitalize text-gray-800">
          {showDetail} Details
        </h2>


        {showDetail === "demographic" && (
          <div>
            <p className="text-gray-600 mb-4">
              Gender distribution of your audience based on current reach data.
            </p>
            <div className="flex justify-center mb-6">
              <PieChart width={300} height={250}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                >
                  {pieData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <ul className="space-y-3">
              {pieData.map((d, i) => (
                <li
                  key={i}
                  className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg border"
                >
                  <span className="font-medium">{d.name}</span>
                  <span className="font-semibold">{d.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showDetail === "channels" && (
          <div>
            <p className="text-gray-600 mb-4">
              Detailed overview of traffic sources and engagement performance.
            </p>
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-lime-100">
                <tr>
                  <th className="py-2 px-3 text-left">Channel</th>
                  <th className="py-2 px-3 text-right">Visits</th>
                  <th className="py-2 px-3 text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topChannels.map((ch, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-3">{ch.name}</td>
                    <td className="py-2 px-3 text-right">{ch.visits.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-green-600 font-medium">
                      {ch.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-gray-700">Channel Engagement Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={topChannels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ReTooltip />
                  <Bar dataKey="visits" fill="#84cc16" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {showDetail === "conversion" && (
          <div>
            <p className="text-gray-600 mb-4">
              Breakdown of conversion metrics across different stages of your marketing funnel.
            </p>

            <div className="space-y-4">
              {[
                { label: "Website Visits", value: 100 },
                { label: "Leads Captured", value: 72 },
                { label: "Conversions", value: 45 },
              ].map((stage, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{stage.label}</span>
                    <span className="font-semibold">{stage.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        i === 0
                          ? "bg-blue-400"
                          : i === 1
                          ? "bg-lime-400"
                          : "bg-pink-400"
                      }`}
                      style={{ width: `${stage.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Conversion rate reflects how effectively your campaigns turn engagement into actual outcomes.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </main>
  );
}
