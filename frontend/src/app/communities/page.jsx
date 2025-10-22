"use client";

import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: "Tech Innovators",
      description: "A group for students passionate about coding, AI, and startups.",
      members: 128,
      joined: true,
      image: "/tech.png",
      posts: [
        { id: 1, author: "Sam", content: "Excited to share our new project on Web3!" },
        { id: 2, author: "Mark", content: "Next meetup scheduled for Oct 25, 2025." },
      ],
    },
    {
      id: 2,
      name: "Design Hive",
      description: "Where creativity meets technology. Share and critique UI/UX designs.",
      members: 89,
      joined: false,
      image: "/design.png",
      posts: [{ id: 1, author: "Claire", content: "New Figma challenge open this week!" }],
    },
    {
      id: 3,
      name: "QCU Gamers",
      description: "For students who love e-sports, gaming events, and community tournaments.",
      members: 204,
      joined: false,
      image: "/gaming.png",
      posts: [{ id: 1, author: "John", content: "Valorant competition next month! 🕹️" }],
    },
  ]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    image: "",
  });


  const toggleJoin = (id) => {
    setCommunities(
      communities.map((c) =>
        c.id === id
          ? {
              ...c,
              joined: !c.joined,
              members: c.joined ? c.members - 1 : c.members + 1,
            }
          : c
      )
    );
  };


  const sortedCommunities = [...communities].sort((a, b) => {
    if (sortBy === "members") return b.members - a.members;
    if (sortBy === "oldest") return a.id - b.id;
    return b.id - a.id; 
  });


  const filteredCommunities = sortedCommunities.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );


  const addCommunity = (e) => {
    e.preventDefault();
    if (!newCommunity.name || !newCommunity.description) {
      alert("Please fill out all fields");
      return;
    }

    setCommunities([
      ...communities,
      {
        id: Date.now(),
        ...newCommunity,
        members: 1,
        joined: true,
        posts: [],
      },
    ]);
    setNewCommunity({ name: "", description: "", image: "" });
  };

  return (
    <main className="flex w-full h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">🌐 Communities</h1>


        <div className="flex flex-wrap items-center justify-between mb-5 gap-3">
          <input
            type="text"
            placeholder="🔍 Search community..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-black w-full md:w-1/3"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-black"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="members">Most Members</option>
          </select>
        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className="bg-white border rounded-xl shadow-md hover:shadow-lg transition relative"
            >
              <div
                className="h-32 bg-gray-100 flex justify-center items-center rounded-t-xl cursor-pointer"
                onClick={() => setSelectedCommunity(community)}
              >
                <img
                  src={community.image || "/default-community.png"}
                  alt={community.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#D8F3A2]"
                />
              </div>
              <div className="p-4">
                <h2
                  className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline"
                  onClick={() => setSelectedCommunity(community)}
                >
                  {community.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {community.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  👥 {community.members} members
                </p>
                <button
                  onClick={() => toggleJoin(community.id)}
                  className={`mt-3 px-4 py-2 rounded-lg w-full font-medium transition ${
                    community.joined
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-[#D8F3A2] text-gray-900 hover:bg-[#c7e689]"
                  }`}
                >
                  {community.joined ? "Leave Community" : "Join Community"}
                </button>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-8 bg-white p-5 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            ➕ Create New Community
          </h2>
          <form
            onSubmit={addCommunity}
            className="grid md:grid-cols-2 gap-3"
          >
            <input
              type="text"
              placeholder="Community Name"
              value={newCommunity.name}
              onChange={(e) =>
                setNewCommunity({ ...newCommunity, name: e.target.value })
              }
              className="p-2 border rounded-lg bg-white text-black"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewCommunity({ ...newCommunity, image: URL.createObjectURL(e.target.files[0]) })
              }
              className="p-2 border rounded-lg bg-white text-black"
            />
            <textarea
              placeholder="Community Description"
              value={newCommunity.description}
              onChange={(e) =>
                setNewCommunity({ ...newCommunity, description: e.target.value })
              }
              className="col-span-2 p-2 border rounded-lg bg-white text-black"
              rows="3"
              required
            />
            <button
              type="submit"
              className="col-span-2 bg-[#D8F3A2] text-gray-900 py-2 rounded-lg hover:bg-[#c7e689] transition"
            >
              Create Community
            </button>
          </form>
        </div>


        {selectedCommunity && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-[600px] p-5 relative">
              <button
                onClick={() => setSelectedCommunity(null)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black"
              >
                ✖
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={selectedCommunity.image || "/default-community.png"}
                  className="w-24 h-24 rounded-full border-4 border-[#D8F3A2]"
                />
                <h2 className="text-xl font-bold mt-3 text-gray-800">
                  {selectedCommunity.name}
                </h2>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {selectedCommunity.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  👥 {selectedCommunity.members} members
                </p>
              </div>


              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Recent Posts
                </h3>
                {selectedCommunity.posts.length > 0 ? (
                  selectedCommunity.posts.map((post) => (
                    <div
                      key={post.id}
                      className="border-b border-gray-200 py-2"
                    >
                      <p className="text-sm text-gray-800 font-medium">
                        {post.author}
                      </p>
                      <p className="text-sm text-gray-600">{post.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No posts yet in this community.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
