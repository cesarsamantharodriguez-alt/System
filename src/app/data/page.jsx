"use client";

import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function Page() {
  const [data] = useState([
    {
      id: 1,
      employeeId: "EMP-001",
      name: "Samantha Cesar",
      role: "OJT",
      department: "IT",
      location: "Quezon City",
      email: "samantha@test.com",
      dateJoined: "2022-01-15",
      status: "Present",
    },
    {
      id: 2,
      employeeId: "EMP-002",
      name: "Lianna Cuesta",
      role: "System analyst",
      department: "Analyst",
      location: "Sta. Mesa",
      email: "lianna@test.com",
      dateJoined: "2021-08-03",
      status: "On Leave",
    },
    {
      id: 3,
      employeeId: "EMP-003",
      name: "Juan Cruz",
      role: "Developer",
      department: "IT",
      location: "Pasig City",
      email: "juan@test.com",
      dateJoined: "2020-06-20",
      status: "On Leave",
    },
    {
      id: 4,
      employeeId: "EMP-004",
      name: "Jane Sy",
      role: "UI/UX Designer",
      department: "Web Design",
      location: "Taguig City",
      email: "jane@test.com",
      dateJoined: "2019-11-11",
      status: "On Leave",
    },
     {
      id: 5,
      employeeId: "EMP-005",
      name: "Dawn Cruz",
      role: "Virtual Assistant",
      department: "Admin",
      location: "San juan City",
      email: "dawn@test.com",
      dateJoined: "2019-01-18",
      status: "Present",
    },
    {
      id: 6,
      employeeId: "EMP-006",
      name: "Ethan Ramirez",
      role: "Tech Support",
      department: "Hardware",
      location: "Malolos City",
      email: "Ethan@test.com",
      dateJoined: "2022-04-17",
      status: "Present",
    },
    {
      id: 7,
      employeeId: "EMP-007",
      name: "Daniel Navarro",
      role: "Database Administrator",
      department: "Database",
      location: "Quezon City",
      email: "Daniel@test.com",
      dateJoined: "2021-07-17",
      status: "Present",
    },
    {
  id: 8,
  employeeId: "EMP-008",
  name: "Andrea Villanueva",
  role: "HR Manager",
  department: "Human Resources",
  location: "Makati City",
  email: "andrea@test.com",
  dateJoined: "2018-05-09",
  status: "On Leave",
},
{
  id: 9,
  employeeId: "EMP-009",
  name: "Michael Tan",
  role: "Project Manager",
  department: "Operations",
  location: "Pasay City",
  email: "michael@test.com",
  dateJoined: "2020-09-14",
  status: "Present",
},
{
  id: 10,
  employeeId: "EMP-010",
  name: "Sophia Reyes",
  role: "Marketing Specialist",
  department: "Marketing",
  location: "Quezon City",
  email: "sophia@test.com",
  dateJoined: "2019-03-25",
  status: "On Leave",
},
{
  id: 11,
  employeeId: "EMP-011",
  name: "Carlos Dela Cruz",
  role: "QA Engineer",
  department: "Quality Assurance",
  location: "Caloocan City",
  email: "carlos@test.com",
  dateJoined: "2022-02-10",
  status: "Present",
},
{
  id: 12,
  employeeId: "EMP-012",
  name: "Isabella Santos",
  role: "Content Writer",
  department: "Communications",
  location: "Manila City",
  email: "isabella@test.com",
  dateJoined: "2021-11-30",
  status: "Present",
},
{
  id: 13,
  employeeId: "EMP-013",
  name: "James Lim",
  role: "Finance Analyst",
  department: "Finance",
  location: "Mandaluyong City",
  email: "james@test.com",
  dateJoined: "2019-08-22",
  status: "On Leave",
},
{
  id: 14,
  employeeId: "EMP-014",
  name: "Angela Cruz",
  role: "Training Coordinator",
  department: "Learning & Development",
  location: "Parañaque City",
  email: "angela@test.com",
  dateJoined: "2018-12-04",
  status: "Present",
},
{
  id: 15,
  employeeId: "EMP-015",
  name: "Robert Mendoza",
  role: "System Administrator",
  department: "IT",
  location: "Las Piñas City",
  email: "robert@test.com",
  dateJoined: "2020-07-19",
  status: "Present",
},
{
  id: 16,
  employeeId: "EMP-016",
  name: "Patricia Gomez",
  role: "Research Associate",
  department: "R&D",
  location: "Marikina City",
  email: "patricia@test.com",
  dateJoined: "2022-05-12",
  status: "On Leave",
},
{
  id: 17,
  employeeId: "EMP-017",
  name: "Henry Ocampo",
  role: "Security Officer",
  department: "Security",
  location: "Antipolo City",
  email: "henry@test.com",
  dateJoined: "2019-10-07",
  status: "Present",
},
{
  id: 18,
  employeeId: "EMP-018",
  name: "Monica Flores",
  role: "Executive Assistant",
  department: "Admin",
  location: "Taguig City",
  email: "monica@test.com",
  dateJoined: "2020-01-29",
  status: "Present",
},
{
  id: 19,
  employeeId: "EMP-019",
  name: "Joshua Torres",
  role: "Graphic Designer",
  department: "Creative",
  location: "Cavite City",
  email: "joshua@test.com",
  dateJoined: "2021-09-03",
  status: "On Leave",
},
{
  id: 20,
  employeeId: "EMP-020",
  name: "Christine Chua",
  role: "Legal Counsel",
  department: "Legal",
  location: "Makati City",
  email: "christine@test.com",
  dateJoined: "2018-06-18",
  status: "Present",
},
{
  id: 21,
  employeeId: "EMP-021",
  name: "Victor Ramos",
  role: "Business Analyst",
  department: "Business Development",
  location: "Quezon City",
  email: "victor@test.com",
  dateJoined: "2020-04-27",
  status: "On Leave",
},
{
  id: 22,
  employeeId: "EMP-022",
  name: "Elaine Bautista",
  role: "Operations Supervisor",
  department: "Operations",
  location: "Muntinlupa City",
  email: "elaine@test.com",
  dateJoined: "2021-02-16",
  status: "On Leave",
},



  ]);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredData = data.filter((item) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      item.name.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.employeeId.toLowerCase().includes(q);

    const matchesRole = filterRole === "All" ? true : item.role === filterRole;
    const matchesStatus = filterStatus === "All" ? true : item.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <main className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
      <Header />
      <div className="p-6 flex-1 overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-900">Employee Directory</h1>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
            <input
              type="text"
              placeholder="🔍 Search by name, ID, department, email or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-400 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3 md:mb-0"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
             className="px-4 py-2 border border-gray-400 rounded-lg text-sm text-green-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">All Roles</option>
              <option value="OJT">OJT</option>
              <option value="System Analyst">System Analyst</option>
              <option value="Developer">Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Virtual Assistant">Virtual Assistant</option>
              <option value="Tech Support">Tech Support</option>
              <option value="Database Administrator">Database Administrator</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="QA Engineer">QA Engineer</option>
              <option value="Content Writer">Content Writer</option>
              <option value="Finance Analyst">Finance Analyst</option>
              <option value="Training Coordinator">Training Coordinator</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Research Associate">Research Associate</option>
              <option value="Security Officer">Security Officer</option>
              <option value="Executive Assistant">Executive Assistant</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-400 rounded-lg text-sm text-green-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="On Leave">On Leave</option>
            </select>
            <button
              onClick={() => {
                setSearch("");
                setFilterRole("All");
                setFilterStatus("All");
              }}
              className="px-4 py-2 bg-gray-200 text-green-900 border border-gray-400 rounded-lg text-sm hover:bg-gray-300"
            >  
              Clear Filters
            </button>
          </div>

   <div className="overflow-x-auto rounded-xl border border-gray-200 shadow bg-white">
  <table className="w-full table-fixed text-sm text-left">
    <thead className="bg-gray-100 text-gray-700 font-semibold">
      <tr>
        <th className="px-4 py-3 border w-24">Employee ID</th>
        <th className="px-4 py-3 border w-40">Name</th>
        <th className="px-4 py-3 border w-44">Role</th>
        <th className="px-4 py-3 border w-36">Department</th>
        <th className="px-4 py-3 border w-32">Location</th>
        <th className="px-4 py-3 border w-48">Email</th>
        <th className="px-4 py-3 border w-28">Date Joined</th>
        <th className="px-4 py-3 border w-24">Status</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
            <td className="px-4 py-3 border font-mono text-xs text-gray-900 whitespace-nowrap">
              {item.employeeId}
            </td>
            <td className="px-4 py-3 border font-medium text-gray-900 whitespace-nowrap truncate">
              {item.name}
            </td>
            <td className="px-4 py-3 border text-gray-800 whitespace-nowrap">
              {item.role}
            </td>
            <td className="px-4 py-3 border text-gray-800 whitespace-nowrap truncate">
              {item.department}
            </td>
            <td className="px-4 py-3 border text-gray-800 whitespace-nowrap truncate">
              {item.location}
            </td>
            <td className="px-4 py-3 border text-sm text-blue-600 underline whitespace-nowrap truncate">
              {item.email}
            </td>
            <td className="px-4 py-3 border text-sm text-gray-900 whitespace-nowrap">
              {item.dateJoined}
            </td>
            <td
              className={`px-4 py-3 border font-semibold whitespace-nowrap ${
                item.status === 'Present'
                  ? 'text-green-600'
                  : item.status === 'On Leave'
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {item.status}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
            No results found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
    </div>
    
    </div>
    </div>
    </main>
  );
}


