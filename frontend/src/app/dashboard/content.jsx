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
  Label,
  AreaChart,
  Area,
  ReferenceLine,
  LabelList,} from "recharts";

const allocationDataAll = [
  { year: 2025, phase: "Phase 1", allocated: 80, available: 20, reserved: 10, offMarket: 5 },
  { year: 2025, phase: "Phase 2", allocated: 65, available: 35, reserved: 15, offMarket: 8 },
  { year: 2025, phase: "Phase 3", allocated: 40, available: 60, reserved: 20, offMarket: 12 },
  { year: 2024, phase: "Phase 1", allocated: 50, available: 30, reserved: 5, offMarket: 3 },
  { year: 2024, phase: "Phase 2", allocated: 30, available: 50, reserved: 12, offMarket: 7 },
  { year: 2024, phase: "Phase 3", allocated: 20, available: 70, reserved: 8, offMarket: 10 },
];

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

const beneficiaryDemographics = [
  { category: "Low-Income Families", beneficiaries: 85, target: 100 },
  { category: "Government Employees", beneficiaries: 60, target: 80 },
  { category: "Relocated Settlers", beneficiaries: 90, target: 90 },
  { category: "Senior Citizens", beneficiaries: 70, target: 90 },
];

const pieData = [
  { name: "Allocated", value: 185 },
  { name: "Available", value: 210 },
  { name: "Reserved", value: 200 },
  { name: "Off Market", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [dateRange, setDateRange] = useState("Q4 2025");

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
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col space-y-6 font-sans">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Project Dashboard</h1>
        <div className="flex gap-3 mt-4 md:mt-0">
          <select
            className="p-2 border rounded-lg bg-white text-gray-800 shadow-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
          </select>
          <select
            className="p-2 border rounded-lg bg-white text-gray-800 shadow-sm"
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
          >
            <option value="All">All Phases</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
          </select>
          <select
            className="p-2 border rounded-lg bg-white text-gray-800 shadow-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="Q1 2025">Qtr1 2025</option>
            <option value="Q2 2025">Qtr2 2025</option>
            <option value="Q3 2025">Qtr3 2025</option>
            <option value="Q4 2025">Qtr4 2025</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Units", value: "500", change: "+2%", color: "text-blue-600" },
          { title: "Allocation", value: "185", change: "+5%", color: "text-teal-600" },
          { title: "Revenue", value: "₱75M", change: "+12%", color: "text-indigo-600" },
          { title: "Beneficiary Rate", value: "90%", change: "-3%", color: "text-emerald-600" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <div className="flex items-end justify-between mt-2">
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
              <span
                className={`text-sm font-semibold ${
                  card.change.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl shadow-sm p-6 bg-white border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Housing Allocation by Phase</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredAllocationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="allocated" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              <Bar dataKey="available" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="reserved" fill="#facc15" radius={[6, 6, 0, 0]} />
              <Bar dataKey="offMarket" fill="#f87171" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl shadow-sm p-6 bg-white border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl shadow-sm p-6 bg-white border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Units Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {pieData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
                <Label
                  position="center"
                  content={() => (
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl font-bold fill-gray-800"
                    >
                      695 Total
                    </text>
                  )}
                />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl shadow-sm p-6 bg-white border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Project Completion Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionTrend}>
              <defs>
                <linearGradient id="completionColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: "Completion (%)", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <ReferenceLine y={100} stroke="gray" strokeDasharray="4 4" label="Target" />
              <Area type="monotone" dataKey="completion" stroke="#2563eb" fill="url(#completionColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl shadow-sm p-6 bg-white border border-gray-200 col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Housing Beneficiaries Breakdown</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={beneficiaryDemographics} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={180} />
              <Tooltip />
              <Bar dataKey="beneficiaries" fill="#10b981" radius={[0, 8, 8, 0]}>
                <LabelList dataKey="beneficiaries" position="right" />
              </Bar>
              <ReferenceLine x={90} stroke="#ef4444" strokeDasharray="4 4" label="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <footer className="text-sm text-gray-500 text-right mt-6">
        Data Last Updated: Oct 7, 2025
      </footer>
    </div>
  );
}
