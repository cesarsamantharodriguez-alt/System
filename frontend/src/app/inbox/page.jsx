"use client";

import React, { useMemo, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Image from "next/image";
import {
  Mail,
  Star,
  Trash2,
  Reply,
  Send,
  Search,
  ChevronDown,
  Paperclip,
  Forward,
  CheckCircle,
} from "lucide-react";

export default function InboxPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Admin Team",
      subject: "System Update Notification",
      preview:
        "We’ve improved the User experience with new features.",
      time: "2025-10-20T09:42:00Z",
      starred: true,
      category: "Primary",
      attachments: 1,
      read: false,
      content: `Hello Sam,\n\nWe're excited to inform you that the new user experience update has been rolled out.You can now view deeper insights.\n\nBest regards,\nAdmin Team`,
    },
    {
      id: 2,
      sender: "Support",
      subject: "Password Reset Confirmation",
      preview: "Your password has been successfully changed.",
      time: "2025-10-19T12:00:00Z",
      starred: false,
      category: "Primary",
      attachments: 0,
      read: true,
      content: `Hi Sam,\n\nThis is to confirm that your account password has been updated.\nIf this wasn’t you, please contact our support team immediately.\n\nThank you,\nSupport Team`,
    },
    {
      id: 3,
      sender: "Project Coordinator",
      subject: "Meeting Reminder — Tomorrow 10 AM",
      preview: "Don't forget our system enhancement meeting.",
      time: "2025-10-18T08:30:00Z",
      starred: false,
      category: "Primary",
      attachments: 2,
      read: false,
      content: `Hi Samantha,\n\nThis is a reminder for our meeting scheduled tomorrow at 10 AM regarding the system enhancement project.\n\nKindly confirm your attendance.\n\nRegards,\nProject Coordinator`,
    },
    {
      id: 4,
      sender: "You",
      subject: "Sent: Proposal Draft",
      preview: "Please find attached the latest proposal draft.",
      time: "2025-10-16T15:00:00Z",
      starred: false,
      category: "Sent",
      attachments: 1,
      read: true,
      content: `Hi Admin Team,\n\nAttached is the latest proposal draft for your review.\n\nRegards,\nSamantha`,
    },
  ]);


  const [selectedMessage, setSelectedMessage] = useState(null);
  const [tab, setTab] = useState("Primary"); 
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [replyText, setReplyText] = useState("");

 
  const updateMessage = (id, patch) => {
    setMessages((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...patch } : m));
      return next;
    });

    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, ...patch } : prev));
    }
  };

 
  const toggleStar = (id) => {
    updateMessage(id, (old) => {
     
    });

    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((s) => ({ ...s, starred: !s.starred }));
    }
  };


  const moveToTrash = (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, category: "Trash" } : m)));
    if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null);
  };

  
  const toggleRead = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((s) => ({ ...s, read: !s.read }));
    }
  };


  const sendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    const newMsg = {
      id: Date.now(),
      sender: "You",
      subject: `Re: ${selectedMessage.subject}`,
      preview: replyText.slice(0, 80),
      time: new Date().toISOString(),
      starred: false,
      category: "Sent",
      attachments: 0,
      read: true,
      content: replyText,
    };
    setMessages((prev) => [newMsg, ...prev]);
    setReplyText("");
    alert("Reply sent (demo). Message added to Sent.");
  };


  const forwardMessage = (msg) => {
    if (!msg) return;
    const newMsg = {
      id: Date.now() + 1,
      sender: "You",
      subject: `Fwd: ${msg.subject}`,
      preview: msg.preview,
      time: new Date().toISOString(),
      starred: false,
      category: "Sent",
      attachments: msg.attachments,
      read: true,
      content: `FWD:\n\n${msg.content}`,
    };
    setMessages((prev) => [newMsg, ...prev]);
    alert("Message forwarded (demo) — added to Sent.");
  };


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = messages.filter((m) => {
      if (tab === "Primary") return m.category === "Primary";
      if (tab === "Starred") return !!m.starred;
      if (tab === "Sent") return m.category === "Sent";
      if (tab === "Trash") return m.category === "Trash";
      return true;
    });

    if (q) {
      list = list.filter((m) => {
        return (
          m.sender.toLowerCase().includes(q) ||
          (m.subject && m.subject.toLowerCase().includes(q)) ||
          (m.preview && m.preview.toLowerCase().includes(q)) ||
          (m.content && m.content.toLowerCase().includes(q))
        );
      });
    }


    if (sort === "newest") {
      list.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (sort === "oldest") {
      list.sort((a, b) => new Date(a.time) - new Date(b.time));
    } else if (sort === "unread-first") {
      list.sort((a, b) => {
        if (a.read === b.read) return new Date(b.time) - new Date(a.time);
        return a.read ? 1 : -1; 
      });
    }

    return list;
  }, [messages, tab, query, sort]);


  const openMessage = (m) => {
    setSelectedMessage(m);
    if (!m.read) {
      setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: true } : x)));
      setSelectedMessage((prev) => (prev ? { ...prev, read: true } : prev));
    }
  };

  return (
    <main className="flex bg-[#F9FAFB] min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="Inbox" />


        <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
          <div className="flex items-center gap-4">
            {["Primary", "Starred", "Sent", "Trash"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setSelectedMessage(null);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  tab === t ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-lg px-2 py-1 bg-gray-50 text-gray-500">
              <Search size={16} className="text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search mail..."
                className="ml-2 outline-none bg-transparent text-sm"
              />
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-white text-sm text-gray-500"
                aria-label="Sort messages"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="unread-first">Unread first</option>
              </select>
            </div>
          </div>
        </div>


        <div className="flex flex-1 p-6 gap-4 overflow-hidden">

          <div className="w-1/3 bg-white rounded-xl shadow border border-gray-200 overflow-y-auto">
            {filtered.length ? (
              filtered.map((m) => (
                <div
                  key={m.id}
                  onClick={() => openMessage(m)}
                  className={`p-4 border-b cursor-pointer transition flex flex-col ${
                    selectedMessage?.id === m.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                        m.read ? "bg-gray-400" : "bg-green-600"
                      }`}>
                        {m.sender ? m.sender.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{m.sender}</p>
                        <p className="text-sm text-gray-700 truncate w-48">{m.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-start flex-col gap-1">
                      <span className="text-xs text-gray-500">
                        {new Date(m.time).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-2">
                        {m.attachments > 0 && <Paperclip size={14} className="text-gray-400" />}
                        <Star
                          size={16}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(m.id);
                          }}
                          className={`cursor-pointer ${m.starred ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500 truncate w-64">{m.preview}</p>
                    <div className="flex gap-2">
                      <button
                        title={m.read ? "Mark as unread" : "Mark as read"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRead(m.id);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-900"
                      >
                        {m.read ? "Mark unread" : "Mark read"}
                      </button>
                      <button
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToTrash(m.id);
                        }}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-gray-400">
                <Mail size={40} className="mb-3" />
                <p>No messages found</p>
              </div>
            )}
          </div>


          <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 p-6 overflow-y-auto">
            {selectedMessage ? (
              <>
                <div className="flex justify-between items-start border-b pb-3 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{selectedMessage.subject}</h2>
                    <p className="text-sm text-gray-500">From: {selectedMessage.sender}</p>
                    <p className="text-xs text-gray-400">{new Date(selectedMessage.time).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Star
                      size={18}
                      onClick={() => toggleStar(selectedMessage.id)}
                      className={`${selectedMessage.starred ? "text-yellow-400" : "text-gray-300"} cursor-pointer`}
                    />
                    <Trash2
                      size={18}
                      onClick={() => moveToTrash(selectedMessage.id)}
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                    />
                    <CheckCircle
                      size={18}
                      onClick={() => toggleRead(selectedMessage.id)}
                      className="cursor-pointer text-gray-400 hover:text-green-500"
                    />
                  </div>
                </div>

                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed mb-4">{selectedMessage.content}</pre>

                {selectedMessage.attachments > 0 && (
                  <div className="border-t pt-3 mb-4">
                    <p className="text-sm text-gray-600 font-semibold mb-2">Attachments:</p>
                    <div className="flex gap-3">
                      {Array.from({ length: selectedMessage.attachments }).map((_, i) => (
                        <div key={i} className="p-3 border rounded-lg text-gray-500 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                          <Paperclip size={16} />
                          <span className="text-sm">File_{i + 1}.pdf</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                <div className="border-t pt-3 space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="flex gap-3">
                    <button onClick={sendReply} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Send size={16} /> Send
                    </button>
                    <button onClick={() => forwardMessage(selectedMessage)} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                      <Forward size={16} /> Forward
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Mail size={48} className="mb-3" />
                <p>Select a message to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
