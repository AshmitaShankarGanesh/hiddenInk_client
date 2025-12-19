import React, { useEffect, useState } from "react";
import NotesPanel from "../Components/NotesPanel";
import DashboardStats from "./DashboardStats";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalNotes: 0,
    lockedNotes: 0,
    todos: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const [notesRes, todosRes] = await Promise.all([
        axios.get("http://localhost:5000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/todos", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStats({
        totalNotes: notesRes.data.length,
        lockedNotes: notesRes.data.filter(n => n.isLocked).length,
        todos: todosRes.data.length,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-2">
        Welcome back{user?.name ? `, ${user.name}` : ""} 👋
      </h1>

      <p className="text-gray-500 mb-6">
        Here’s what’s happening with your notes today
      </p>

      <DashboardStats stats={stats} />
      <NotesPanel />
    </div>
  );
};

export default UserDashboard;
