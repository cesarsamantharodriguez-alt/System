"use client";

import { useState, useMemo } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function Page() {

  const [folders, setFolders] = useState([
    { name: "Reports", files: ["report1.csv", "summary.pdf"] },
    { name: "Images", files: ["chart.png", "growth.png"] },
  ]);

  const [files, setFiles] = useState([
    { name: "overview.csv", date: "2025-10-20" },
    { name: "users.json", date: "2025-10-18" },
    { name: "data.xlsx", date: "2025-10-17" },
    { name: "project.docx", date: "2025-10-15" },
    { name: "logo.png", date: "2025-10-14" },
  ]);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [files, search]);

  const paginatedFiles = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredFiles.slice(start, start + rowsPerPage);
  }, [filteredFiles, page, rowsPerPage]);


  const [employees] = useState([
    {
      id: 1, employeeId: "EMP-001", name: "Samantha Cesar", role: "OJT",department: "IT", location: "Quezon City", email: "sam@test.com", dateJoined: "2022-01-15", status: "Present",},
    {
      id: 2, employeeId: "EMP-002", name: "Lianna Cuesta", role: "System Analyst", department: "Analyst", location: "Sta. Mesa", email: "lianna@test.com", dateJoined: "2021-08-03", status: "On Leave",},
    { 
      id: 3, employeeId: "EMP-003", name: "Juan Cruz", role: "Developer", department: "IT", location: "Pasig City", email: "juan@test.com", dateJoined: "2020-06-20", status: "On Leave",},
    { 
      id: 4, employeeId: "EMP-004", name: "Ethan Ramirez", role: "Supervisor", department: "Admin", location: "Pasay City", email: "ethan@test.com", dateJoined: "2021-07-21", status: "Present"},
   
    
    ]);

  const [empSearch, setEmpSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [empPage, setEmpPage] = useState(1);
  const [empRows, setEmpRows] = useState(5);

  const filteredEmployees = useMemo(() => {
    const q = empSearch.toLowerCase();
    return employees.filter((e) => {
      const match =
        e.name.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q);
      return match && (filterStatus === "All" || e.status === filterStatus);
    });
  }, [employees, empSearch, filterStatus]);

  const paginatedEmployees = filteredEmployees.slice(
    (empPage - 1) * empRows,
    empPage * empRows
  );


  const handleExport = () => {
    const csv = [
      [
        "Employee ID",
        "Name",
        "Role",
        "Department",
        "Location",
        "Email",
        "Date Joined",
        "Status",
      ],
      ...filteredEmployees.map((e) => [
        e.employeeId,
        e.name,
        e.role,
        e.department,
        e.location,
        e.email,
        e.dateJoined,
        e.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employee_directory.csv";
    link.click();
  };

  return (
    <main className="flex w-full min-h-screen bg-[#F6FCE6] text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title="Files & Employees" />
        <div className="flex-1 p-6 overflow-y-auto space-y-10">

          <section className="bg-white border rounded-xl p-6 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              📂 File & Folder Manager
            </h2>

            <div className="flex flex-wrap gap-3 mb-4">
              <input
                type="text"
                placeholder="Search files or folders..."
                className="px-3 py-2 border rounded-lg bg-white text-gray-800 flex-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => {
                  const folderName = prompt("Enter new folder name:");
                  if (folderName)
                    setFolders((prev) => [
                      ...prev,
                      { name: folderName, files: [] },
                    ]);
                }}
                className="px-4 py-2 bg-[#D8F3A2] text-gray-900 rounded-lg hover:bg-[#c7e689]"
              >
                ➕ New Folder
              </button>
              <button
                onClick={() => {
                  const fileName = prompt("Enter new file name:");
                  if (fileName)
                    setFiles((prev) => [
                      ...prev,
                      { name: fileName, date: new Date().toLocaleDateString() },
                    ]);
                }}
                className="px-4 py-2 bg-[#A7D477] text-gray-900 rounded-lg hover:bg-[#92c96c]"
              >
                📄 Add File
              </button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {folders
                .filter((f) =>
                  f.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((folder, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800">
                         {folder.name}
                      </span>
                      <button
                        onClick={() =>
                          confirm(`Delete folder "${folder.name}"?`) &&
                          setFolders((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                    <ul className="text-sm text-gray-700 ml-5 list-disc">
                      {folder.files.length > 0 ? (
                        folder.files.map((file, i) => <li key={i}>{file}</li>)
                      ) : (
                        <li className="text-gray-400">No files</li>
                      )}
                    </ul>
                  </div>
                ))}
            </div>
          </section>


          <section className="bg-white border rounded-xl p-6 shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              👩‍💼 Employee Directory
            </h2>

            <div className="flex flex-wrap gap-3 mb-4">
              <input
                type="text"
                placeholder="Search employee..."
                className="px-3 py-2 border rounded-lg bg-white text-gray-800 flex-1"
                value={empSearch}
                onChange={(e) => setEmpSearch(e.target.value)}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg text-gray-800"
              >
                <option value="All">All</option>
                <option value="Present">Present</option>
                <option value="On Leave">On Leave</option>
              </select>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Export CSV
              </button>
            </div>

            <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="p-2 border">Employee ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Department</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="hover:bg-green-100 transition-colors"
                    >
                      <td className="p-2 border font-mono">{emp.employeeId}</td>
                      <td className="p-2 border">{emp.name}</td>
                      <td className="p-2 border">{emp.role}</td>
                      <td className="p-2 border">{emp.department}</td>
                      <td className="p-2 border">{emp.location}</td>
                      <td className="p-2 border text-blue-600 underline">
                        {emp.email}
                      </td>
                      <td
                        className={`p-2 border font-semibold ${
                          emp.status === "Present"
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        {emp.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-4 text-center text-gray-500 bg-gray-50"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
}
