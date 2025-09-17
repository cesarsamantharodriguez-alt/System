"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LabelList,
} from "recharts";

// Demo data for Housing Allocation by Phase (instead of sales)
const allocationDataAll = [
  { year: 2025, phase: "Phase 1", allocated: 80, available: 20, reserved: 10, offMarket: 5 },
  { year: 2025, phase: "Phase 2", allocated: 65, available: 35, reserved: 15, offMarket: 8 },
  { year: 2025, phase: "Phase 3", allocated: 40, available: 60, reserved: 20, offMarket: 12 },
  { year: 2024, phase: "Phase 1", allocated: 50, available: 30, reserved: 5, offMarket: 3 },
  { year: 2024, phase: "Phase 2", allocated: 30, available: 50, reserved: 12, offMarket: 7 },
  { year: 2024, phase: "Phase 3", allocated: 20, available: 70, reserved: 8, offMarket: 10 },
];

// Revenue data (unchanged)
const revenueData = [
  { month: "Jan", revenue: 5 },
  { month: "Feb", revenue: 8 },
  { month: "Mar", revenue: 6 },
  { month: "Apr", revenue: 10 },
  { month: "May", revenue: 12 },
  { month: "Jun", revenue: 14 },
  { month: "Jul", revenue: 20 },
  { month: "Aug", revenue: 35 },
  { month: "Sep", revenue: 40 },
  { month: "Oct", revenue: 60 },
  { month: "Nov", revenue: 70 },
  { month: "Dec", revenue: 50 },
];

// Project completion trend (unchanged)
const completionTrend = [
  { month: "Jan", completion: 15 },
  { month: "Feb", completion: 25 },
  { month: "Mar", completion: 30 },
  { month: "Apr", completion: 40 },
  { month: "May", completion: 55 },
  { month: "Jun", completion: 60 },
  { month: "Jul", completion: 65 },
  { month: "Aug", completion: 70 },
  { month: "Sep", completion: 78 },
  { month: "Oct", completion: 85 },
  { month: "Nov", completion: 90 },
  { month: "Dec", completion: 95 },
];

// Beneficiary Demographics (unchanged)
const beneficiaryDemographics = [
  { category: "Low-income Families", beneficiaries: 85 },
  { category: "Government Employees", beneficiaries: 1 },
  { category: "Relocated Informal Settlers", beneficiaries: 90 },
  { category: "Senior Citizen Beneficiaries", beneficiaries: 60 },
];

const pieData = [
  { name: "Allocated", value: 185 },
  { name: "Available", value: 210 },
  { name: "Reserved", value: 200 },
  { name: "Off Market", value: 100 },
];

// NHA colors
const COLORS = ["#15803d", "#4ade80", "#facc15", "#f87171"];

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedPhase, setSelectedPhase] = useState("All");

  let filteredAllocationData = allocationDataAll.filter(
    (item) =>
      item.year === Number(selectedYear) &&
      (selectedPhase === "All" || item.phase === selectedPhase)
  );

  if (selectedPhase === "All") {
    const totals = filteredAllocationData.reduce(
      (acc, item) => {
        acc.allocated += item.allocated;
        acc.available += item.available;
        acc.reserved += item.reserved;
        acc.offMarket += item.offMarket;
        return acc;
      },
      { allocated: 0, available: 0, reserved: 0, offMarket: 0 }
    );
    filteredAllocationData = [
      {
        name: "All Phases",
        ...totals,
      },
    ];
  } else {
    filteredAllocationData = filteredAllocationData.map((d) => ({
      name: d.phase,
      allocated: d.allocated,
      available: d.available,
      reserved: d.reserved,
      offMarket: d.offMarket,
    }));
  }

  return (
    <div className="p-6 grid gap-6 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-extrabold text-green-900 tracking-tight">Dashboard</h1>

        <div className="flex gap-4 mt-4 md:mt-0">
          <select
            className="p-2 border rounded-lg bg-white text-green-900 shadow-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
          </select>
          <select
            className="p-2 border rounded-lg bg-white text-green-900 shadow-sm"
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
          >
            <option value="All">All Phases</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
          </select>
        </div>
      </div>
      
      {/* ... your KPI cards code here ... */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="rounded-2xl shadow-lg p-6 bg-gradient-to-br from-green-700 to-blue-200 text-white 
    hover:from-green-800 hover:to-green-600 hover:scale-110 transition-transform duration-400">
    <p className="text-sm opacity-90">Total Units</p>
    <p className="text-3xl font-bold">500</p>
  </div>

  <div className="rounded-2xl shadow-lg p-6 bg-gradient-to-br from-green-600 to-gray-300 text-white 
    hover:from-green-700 hover:to-green-500 hover:scale-110 transition-transform duration-400">
    <p className="text-sm opacity-90">Housing Allocation</p>
    <p className="text-3xl font-bold">185</p>
  </div>

  <div className="rounded-2xl shadow-lg p-6 bg-gradient-to-br from-green-500 to-green-300 text-white 
    hover:from-green-600 hover:to-green-400 hover:scale-110 transition-transform duration-400">
    <p className="text-sm opacity-90">Revenue</p>
    <p className="text-3xl font-bold">₱75M</p>
  </div>

  <div className="rounded-2xl shadow-lg p-6 bg-gradient-to-br from-green-400 to-green-200 text-white 
    hover:from-green-500 hover:to-green-300 hover:scale-110 transition-transform duration-400">
    <p className="text-sm opacity-90">Housing Beneficiaries</p>
    <p className="text-3xl font-bold">90%</p>
  </div>
</div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Housing Allocation by Phase (updated) */}
        <div className="rounded-2xl shadow-xl p-6 bg-white border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Housing Allocation by Phase</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredAllocationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#166534", fontWeight: 600 }} />
              <YAxis tick={{ fill: "#166534", fontWeight: 600 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="allocated" fill="#15803d" radius={[6, 6, 0, 0]} />
              <Bar dataKey="available" fill="#4ade80" radius={[6, 6, 0, 0]} />
              <Bar dataKey="reserved" fill="#facc15" radius={[6, 6, 0, 0]} />
              <Bar dataKey="offMarket" fill="#f87171" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
{/* Revenue Trend */}
        <div className="rounded-2xl shadow-xl p-6 bg-white border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: "#166534", fontWeight: 600 }} />
              <YAxis tick={{ fill: "#166534", fontWeight: 600 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#15803d"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Units Distribution */}
        <div className="rounded-2xl shadow-xl p-6 bg-white border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Units Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Project Completion Trend (line + shaded area for clarity) */}
        <div className="rounded-2xl shadow-xl p-6 bg-white border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Project Completion Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionTrend}>
              <defs>
                <linearGradient id="completionColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: "#166534", fontWeight: 600 }} />
              <YAxis tick={{ fill: "#166534", fontWeight: 600 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Area
                type="monotone"
                dataKey="completion"
                stroke="#15803d"
                strokeWidth={3}
                fill="url(#completionColor)"
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Housing Beneficiaries by Category (replaces buyers by age) */}
        <div className="rounded-2xl shadow-xl p-6 bg-gradient-to-br from-green-50 via-white to-green-50 border border-green-100 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-700">Housing Beneficiaries</h2>
            <span className="text-sm text-green-500">Current Distribution</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={beneficiaryDemographics} layout="vertical" barSize={22}>
              <defs>
                <linearGradient id="beneficiariesGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#15803d" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity={0.95} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="category"
                type="category"
                tick={{ fill: "#166534", fontWeight: 600, fontSize: 13 }}
                width={200}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#00050ad0",
                  border: "1px solid #e5ebe6ff",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
                formatter={(value) => [`${value} households`]}
              />
              <Bar dataKey="beneficiaries" fill="url(#beneficiariesGradient)" radius={[0, 8, 8, 0]}>
                <LabelList
                  dataKey="beneficiaries"
                  position="right"
                  style={{ fill: "#166534", fontWeight: "600" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
