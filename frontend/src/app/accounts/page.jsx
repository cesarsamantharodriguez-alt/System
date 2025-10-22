"use client";

import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function UserPage() {
  const [users, setUsers] = useState([
    { id: 1, firstName: "Samantha", middleName: "Rodriguez", lastName: "Cesar", email: "samantha@example.com", role: "Standard User", status: "Active" },
    { id: 2, firstName: "Lianna", middleName: "Nuylan", lastName: "Cuesta", email: "lianna@example.com", role: "Standard User", status: "Active" },
    { id: 3, firstName: "Dawn", middleName: "Frando", lastName: "Cruz", email: "Dawn@test.com", role: "Admin", status: "Active" },
    { id: 4, firstName: "Ethan", middleName: "Chua", lastName: "Ramirez", email: "Ethan@test.com", role: "Supervisor", status: "Active" },
    { id: 5, firstName: "Jane", middleName: "Havar", lastName: "Sy", email: "Jane@test.com", role: "Standard User", status: "Disabled" },
    { id: 6, firstName: "Ethan", middleName: "Chua", lastName: "Ramirez", email: "Ethan@test.com", role: "Supervisor", status: "Active" },
    { id: 7, firstName: "Daniel", middleName: "John", lastName: "Navarro", email: "mark@test.com", role: "Standard User", status: "Active"},
    { id: 8, firstName: "Andrea", middleName: "Corpuz", lastName: "Villanueva", email: "andrea@test.com", role: "Standard User", status: "Active"},
    { id: 9, firstName: "Michael", middleName: "Reyes", lastName: "Tan", email: "michael@test.com", role: "Standard User", status: "Active"},
    { id: 10, firstName: "Sophia", middleName: "Ang", lastName: "Reyes", email: "sophia@test.com", role: "Standard User", status: "Active"},
    { id: 11, firstName: "Carlos", middleName: "Aquino", lastName: "Dela Cruz", email: "carlos@test.com", role: "Standard User", status: "Active" },
    { id: 12, firstName: "Isabella", middleName: "Ariego", lastName: "Santos", email: "isabella@test.com", role: "Standard User", status: "Active"},
    { id: 13, firstName: "James", middleName: "West", lastName: "Lim", email: "james@test.com", role: "Standard User", status: "Active"},
    { id: 14, firstName: "Angela", middleName: "Romero", lastName: "Cruz", email: "angela@test.com", role: "Standard User", status: "Active"},
    { id: 15, firstName: "Robert", middleName: "Tornea", lastName: "Mendoza", email: "robert@test.com", role: "Standard User", status: "Active"},
    { id: 16, firstName: "Patricia", middleName: "Tanacio", lastName: "Gomez", email: "patricia@test.com", role: "Standard User", status: "Active"},
    { id: 17, firstName: "Henry", middleName: "Vercide", lastName: "Ocampo", email: "henry@test.com", role: "Standard User", status: "Active"},
    { id: 18, firstName: "Monica", middleName: "Andales", lastName: "Flores", email: "monica@test.com", role: "Admin", status: "Active"},
    { id: 19, firstName: "Joshua", middleName: "Fendo", lastName: "Torres", email: "joshua@test.com", role: "Standard User", status: "Active"},
    { id: 20, firstName: "Christine", middleName: "Jaboc", lastName: "Chua", email: "christine@test.com", role: "Standard User", status: "Active"},
    { id: 21, firstName: "Victor", middleName: "Olayon", lastName: "Ramos", email: "victor@test.com", role: "Standard User", status: "Active"},
    { id: 22, firstName: "Elaine", middleName: "Jayobo", lastName: "Bautista", email: "elaine@test.com", role: "Standard User", status: "Active" },

]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "Standard User",
    status: "Active",
  });

  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({ ...newUser });

  const filteredUsers = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.role}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const addUser = () => {
    if (!newUser.firstName.trim() || !newUser.email.trim()) return;
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ firstName: "", middleName: "", lastName: "", email: "", role: "Standard User", status: "Active" });
  };

  const startEdit = (user) => {
    setEditUserId(user.id);
    setEditUser({ ...user });
  };

  const saveEdit = () => {
    setUsers(users.map((u) => (u.id === editUserId ? { ...editUser } : u)));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditUser({ ...newUser });
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const deleteUser = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" }
          : u
      )
    );
  };

  return (
    <main className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="p-8 flex-1 overflow-auto text-gray-800">

          <div className="mb-8 bg-white shadow-lg p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Add New User</h2>
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-teal-400"
              />
              <input
                type="text"
                placeholder="Middle Name"
                value={newUser.middleName}
                onChange={(e) => setNewUser({ ...newUser, middleName: e.target.value })}
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-teal-400"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-teal-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-teal-400"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Standard User">Standard User</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                onClick={addUser}
               className="px-6 py-2 bg-[#D8F3A2] text-gray-900 rounded-lg font-medium hover:bg-[#c7e689] transition"
              >
                Add User
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border rounded-lg bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-teal-400"
            />
          </div>


          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-green-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-[#D8F3A2] text-gray-800 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-teal-50 transition`}
                  >
                    <td className="px-5 py-3 border-t">{user.id}</td>
                    <td className="px-5 py-3 border-t">
                      {user.firstName} {user.middleName} {user.lastName}
                    </td>
                    <td className="px-5 py-3 border-t">{user.email}</td>
                    <td className="px-5 py-3 border-t text-teal-700 font-medium">{user.role}</td>
                    <td className="px-5 py-3 border-t">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-3 py-1 rounded text-white ${
                          user.status === "Active"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-5 py-3 border-t text-center">
                      <button
                        onClick={() => startEdit(user)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(user)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80 border-t-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-red-600">
                    {userToDelete.firstName} {userToDelete.lastName}
                  </span>
                  ?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteUser}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
