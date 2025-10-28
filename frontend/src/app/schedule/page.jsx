"use client";

import { useState, useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function SchedulePostPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Morning Motivation",
      content: "Start your day with positivity ",
      date: "2025-10-22",
      time: "07:30",
      status: "Scheduled",
    },
    {
      id: 2,
      title: "Product Launch!",
      content: "Excited to announce our new product line ",
      date: "2025-10-21",
      time: "12:00",
      status: "Published",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    date: "",
    time: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setPosts((prev) =>
        prev.map((p) => {
          const scheduledTime = new Date(`${p.date}T${p.time}`);
          if (p.status === "Scheduled" && now >= scheduledTime) {
            return { ...p, status: "Published", publishedAt: now.toISOString() };
          }
          return p;
        })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduledDateTime = new Date(`${newPost.date}T${newPost.time}`);
    if (scheduledDateTime < new Date()) {
      alert("You cannot schedule a post in the past.");
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId) {
      setPosts(
        posts.map((p) =>
          p.id === editingId ? { ...p, ...newPost, status: "Scheduled" } : p
        )
      );
      setEditingId(null);
    } else {
      setPosts([
        ...posts,
        {
          id: Date.now(),
          ...newPost,
          status: "Scheduled",
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setNewPost({ title: "", content: "", date: "", time: "", image: null });
  };

  const deletePost = (id) => setPosts(posts.filter((p) => p.id !== id));

  const publishNow = (id) =>
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, status: "Published", publishedAt: new Date().toISOString() } : p
      )
    );

  const editPost = (post) => {
    setNewPost(post);
    setEditingId(post.id);
  };

  const filteredPosts = posts
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all"
          ? true
          : filter === "published"
          ? p.status === "Published"
          : p.status === "Scheduled";
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const formatCountdown = (date, time) => {
    const now = new Date();
    const target = new Date(`${date}T${time}`);
    const diff = target - now;
    if (diff <= 0) return "Publishing soon...";
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <main className="flex w-full min-h-screen bg-white text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6 overflow-auto">
        
        <h1 className="text-2xl font-bold mb-4 text-gray-800">📅 Schedule Post</h1>


        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-lg shadow-md border border-gray-200 mb-6"
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            {editingId ? "✏️ Edit Scheduled Post" : "📝 Create New Post"}
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="p-2 border rounded-lg bg-white text-black"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setNewPost({ ...newPost, image: file });
              }}
              className="p-2 border rounded-lg bg-white text-black"
            />
            <textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="col-span-2 p-2 border rounded-lg bg-white text-black"
              rows="4"
              required
            />
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={newPost.date}
                onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                className="p-2 border rounded-lg bg-white text-black"
                required
              />
              <input
                type="time"
                value={newPost.time}
                onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                className="p-2 border rounded-lg bg-white text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="col-span-2 bg-[#D8F3A2] text-gray-900 py-2 rounded-lg hover:bg-[#c7e689] transition"
            >
              {editingId ? "Update Post" : "Schedule Post"}
            </button>
          </div>
        </form>


        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-black w-full md:w-1/3"
          />
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white text-black"
            >
              <option value="all">All</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white text-black"
            >
              <option value="asc">Sort by Earliest</option>
              <option value="desc">Sort by Latest</option>
            </select>
          </div>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredPosts.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-gray-800">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                {p.date} • {p.time}
              </p>
              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded ${
                  p.status === "Published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>


        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Schedule</th>
                <th className="px-4 py-3 border">Countdown</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length ? (
                filteredPosts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border">{p.title}</td>
                    <td className="px-4 py-3 border">
                      <span
                        className={`px-3 py-1 rounded text-white ${
                          p.status === "Published"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border">
                      {p.date} {p.time}
                    </td>
                    <td className="px-4 py-3 border">
                      {p.status === "Scheduled" ? formatCountdown(p.date, p.time) : "—"}
                    </td>
                    <td className="px-4 py-3 border space-x-2">
                      {p.status === "Scheduled" && (
                        <>
                          <button
                            onClick={() => publishNow(p.id)}
                            className="px-3 py-1 bg-[#D8F3A2] text-gray-900 rounded hover:bg-[#c7e689]"
                          >
                            Publish Now
                          </button>
                          <button
                            onClick={() => editPost(p)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deletePost(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No scheduled posts yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
