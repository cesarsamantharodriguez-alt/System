"use client";

import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function UserPage() {
  const [users, setUsers] = useState([
    { id: 1, firstName: "Samantha", middleName: "Rodriguez", lastName: "Cesar", email: "samantha@example.com", role: "User" },
    { id: 2, firstName: "Lianna", middleName: "Nuylan", lastName: "Cuesta", email: "lianna@example.com", role: "User" },
    { id: 3, firstName: "Juan", middleName: "Garcia", lastName: "Dela Cruz", email: "juan@test.com", role: "User" },
    { id: 4, firstName: "Jane", middleName: "Havar", lastName: "Sy", email: "Jane@test.com", role: "User" },
    { id: 5, firstName: "Dawn", middleName: "Frando", lastName: "Cruz", email: "Dawn@test.com", role: "Admin" },
    { id: 6, firstName: "Ethan", middleName: "Chua", lastName: "Ramirez", email: "Ethan@test.com", role: "User" },
    { id: 7, firstName: "Daniel", middleName: "John", lastName: "Navarro", email: "mark@test.com", role: "User" },
    { id: 8, firstName: "Andrea", middleName: "Corpuz", lastName: "Villanueva", email: "andrea@test.com", role: "User" },
    { id: 9, firstName: "Michael", middleName: "Reys", lastName: "Tan", email: "michael@test.com", role: "User" },
    { id: 10, firstName: "Sophia", middleName: "Ang", lastName: "Reyes", email: "sophia@test.com", role: "User" },
    { id: 11, firstName: "Carlos", middleName: "Aquino", lastName: "Dela Cruz", email: "carlos@test.com", role: "User" },
    { id: 12, firstName: "Isabella", middleName: "Ariego", lastName: "Santos", email: "isabella@test.com", role: "User" },
    { id: 13, firstName: "James", middleName: "West", lastName: "Lim", email: "james@test.com", role: "User" },
    { id: 14, firstName: "Angela", middleName: "Romero", lastName: "Cruz", email: "angela@test.com", role: "User" },
    { id: 15, firstName: "Robert", middleName: "Tornea", lastName: "Mendoza", email: "robert@test.com", role: "User" },
    { id: 16, firstName: "Patricia", middleName: "Tanacio", lastName: "Gomez", email: "patricia@test.com", role: "User" },
    { id: 17, firstName: "Henry", middleName: "Vercide", lastName: "Ocampo", email: "henry@test.com", role: "User" },
    { id: 18, firstName: "Monica", middleName: "Andales", lastName: "Flores", email: "monica@test.com", role: "Admin" },
    { id: 19, firstName: "Joshua", middleName: "Fendo", lastName: "Torres", email: "joshua@test.com", role: "User" },
    { id: 20, firstName: "Christine", middleName: "Jaboc", lastName: "Chua", email: "christine@test.com", role: "User" },
    { id: 21, firstName: "Victor", middleName: "Olayon", lastName: "Ramos", email: "victor@test.com", role: "User" },
    { id: 22, firstName: "Elaine", middleName: "Jayobo", lastName: "Bautista", email: "elaine@test.com", role: "User" },
  ]);

  const [newFirstName, setNewFirstName] = useState("");
  const [newMiddleName, setNewMiddleName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("User");

  const [editUserId, setEditUserId] = useState(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editMiddleName, setEditMiddleName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("User");

  const addUser = () => {
    if (!newFirstName.trim() || !newEmail.trim()) return;
    const newUser = {
      id: users.length + 1,
      firstName: newFirstName,
      middleName: newMiddleName,
      lastName: newLastName,
      email: newEmail,
      role: newRole,
    };
    setUsers([...users, newUser]);
    setNewFirstName("");
    setNewMiddleName("");
    setNewLastName("");
    setNewEmail("");
    setNewRole("User");
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const startEdit = (user) => {
    setEditUserId(user.id);
    setEditFirstName(user.firstName);
    setEditMiddleName(user.middleName);
    setEditLastName(user.lastName);
    setEditEmail(user.email);
    setEditRole(user.role);
  };

  const saveEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === editUserId
          ? {
              ...user,
              firstName: editFirstName,
              middleName: editMiddleName,
              lastName: editLastName,
              email: editEmail,
              role: editRole,
            }
          : user
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditFirstName("");
    setEditMiddleName("");
    setEditLastName("");
    setEditEmail("");
    setEditRole("User");
  };

  return (
    <main className="flex w-full h-screen bg-green-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6 flex-1 overflow-auto text-green-900">
          <h1 className="text-3xl font-extrabold mb-6">User Management</h1>

          {/* Add New User */}
          <div className="mb-6 bg-white shadow p-4 rounded-lg border border-green-200">
            <h2 className="text-xl font-bold mb-3 text-green-600">Add New User</h2>
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
              <input type="text" placeholder="First Name" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black" />
              <input type="text" placeholder="Middle Name" value={newMiddleName} onChange={(e) => setNewMiddleName(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black" />
              <input type="text" placeholder="Last Name" value={newLastName} onChange={(e) => setNewLastName(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black" />
              <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg bg-white text-black" />
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-white text-black">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <button onClick={addUser}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Add
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg border border-green-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-green-100 text-green-700 font-semibold">
                <tr>
                  <th className="px-4 py-3 border">ID</th>
                  <th className="px-4 py-3 border">First Name</th>
                  <th className="px-4 py-3 border">Middle Name</th>
                  <th className="px-4 py-3 border">Last Name</th>
                  <th className="px-4 py-3 border">Email</th>
                  <th className="px-4 py-3 border">Role</th>
                  <th className="px-4 py-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) =>
                  editUserId === user.id ? (
                    <tr key={user.id} className="bg-yellow-50">
                      <td className="px-4 py-3 border">{user.id}</td>
                      <td className="px-4 py-3 border">
                        <input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)}
                          className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-4 py-3 border">
                        <input type="text" value={editMiddleName} onChange={(e) => setEditMiddleName(e.target.value)}
                          className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-4 py-3 border">
                        <input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)}
                          className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-4 py-3 border">
                        <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-4 py-3 border">
                        <select value={editRole} onChange={(e) => setEditRole(e.target.value)}
                          className="w-full px-2 py-1 border rounded">
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 border">
                        <button onClick={saveEdit}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2">
                          Save
                        </button>
                        <button onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={user.id} className="hover:bg-green-50 transition duration-200">
                      <td className="px-4 py-3 border">{user.id}</td>
                      <td className="px-4 py-3 border">{user.firstName}</td>
                      <td className="px-4 py-3 border">{user.middleName}</td>
                      <td className="px-4 py-3 border">{user.lastName}</td>
                      <td className="px-4 py-3 border">{user.email}</td>
                      <td className="px-4 py-3 border">{user.role}</td>
                      <td className="px-4 py-3 border">
                        <button onClick={() => startEdit(user)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
                          Edit
                        </button>
                        <button onClick={() => deleteUser(user.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                      No users found.
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
