import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId"); // store this at login

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/role`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(prev =>
        prev.map(user =>
          user._id === id ? { ...user, role } : user
        )
      );
    } catch (err) {
      alert("Role update failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>

                <td
                  className={
                    user.role === "admin"
                      ? "text-green-600 font-semibold"
                      : ""
                  }
                >
                  {user.role}
                </td>

                <td className="flex gap-3 py-2">
                  {user._id !== currentUserId && (
                    <>
                      {user.role !== "admin" ? (
                        <button
                          onClick={() =>
                            changeRole(user._id, "admin")
                          }
                          className="text-blue-600 hover:underline"
                        >
                          Promote
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            changeRole(user._id, "user")
                          }
                          className="text-yellow-600 hover:underline"
                        >
                          Demote
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() =>
                            deleteUser(user._id)
                          }
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
