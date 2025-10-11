"use client";

import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function UserPage() {
  const [users, setUsers] = useState([
    { id: 1, firstName: "Samantha", middleName: "Rodriguez", lastName: "Cesar", email: "samantha@example.com", role: "Standard User", status: "Active" },
    { id: 2, firstName: "Lianna", middleName: "Nuylan", lastName: "Cuesta", email: "lianna@example.com", role: "Standard User", status: "Active" },
    { id: 3, firstName: "Juan", middleName: "Garcia", lastName: "Dela Cruz", email: "juan@test.com", role: "Standard User", status: "Active" },
    { id: 4, firstName: "Jane", middleName: "Havar", lastName: "Sy", email: "Jane@test.com", role: "Standard User", status: "Disabled" },
    { id: 5, firstName: "Dawn", middleName: "Frando", lastName: "Cruz", email: "Dawn@test.com", role: "Admin", status: "Active" },
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
    <main className="flex w-full h-screen bg-green-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6 flex-1 overflow-auto text-green-900">
          <h1 className="text-3xl font-extrabold mb-6 text-green-800">User Management</h1>

          {/* Add User Section */}
          <div className="mb-6 bg-white shadow p-4 rounded-lg border border-green-200">
            <h2 className="text-xl font-bold mb-3 text-green-700">Add New User</h2>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black"
              />
              <input
                type="text"
                placeholder="Middle Name"
                value={newUser.middleName}
                onChange={(e) => setNewUser({ ...newUser, middleName: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="px-3 py-2 border rounded-lg bg-white text-black"
              >
                <option value="Standard User">Standard User</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                onClick={addUser}
                className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border rounded-lg bg-white text-black shadow-sm"
            />
          </div>

          {/* User Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg border border-green-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-green-100 text-green-700 font-semibold">
                <tr>
                  <th className="px-4 py-3 border">ID</th>
                  <th className="px-4 py-3 border">Full Name</th>
                  <th className="px-4 py-3 border">Email</th>
                  <th className="px-4 py-3 border">Role</th>
                  <th className="px-4 py-3 border">Status</th>
                  <th className="px-4 py-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) =>
                  editUserId === user.id ? (
                    <tr key={user.id} className="bg-yellow-50">
                      <td className="px-4 py-3 border">{user.id}</td>
                      <td className="px-4 py-3 border">
                        <input
                          type="text"
                          value={`${editUser.firstName} ${editUser.lastName}`}
                          readOnly
                          className="w-full px-2 py-1 border rounded bg-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3 border">
                        <input
                          type="email"
                          value={editUser.email}
                          onChange={(e) =>
                            setEditUser({ ...editUser, email: e.target.value })
                          }
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-4 py-3 border">
                        <select
                          value={editUser.role}
                          onChange={(e) =>
                            setEditUser({ ...editUser, role: e.target.value })
                          }
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="Standard User">Standard User</option>
                          <option value="Supervisor">Supervisor</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 border">{editUser.status}</td>
                      <td className="px-4 py-3 border">
                        <button
                          onClick={saveEdit}
                          className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={user.id} className="hover:bg-green-50 transition duration-200">
                      <td className="px-4 py-3 border">{user.id}</td>
                      <td className="px-4 py-3 border">
                        {user.firstName} {user.middleName} {user.lastName}
                      </td>
                      <td className="px-4 py-3 border">{user.email}</td>
                      <td className="px-4 py-3 border">{user.role}</td>
                      <td className="px-4 py-3 border">
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className={`px-3 py-1 rounded text-white ${
                            user.status === "Active"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-400 hover:bg-red-500"
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="px-4 py-3 border">
                        <button
                          onClick={() => startEdit(user)}
                          className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 mr-2"
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
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {userToDelete.firstName} {userToDelete.lastName}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
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
    </main>
  );
}
