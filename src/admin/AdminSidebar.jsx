import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `p-3 rounded-lg transition ${
      isActive ? "bg-blue-900" : "hover:bg-blue-800"
    }`;

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 w-64 bg-blue-700 text-white min-h-screen p-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-2xl font-bold mb-10">HiddenInk Admin</h2>

        <nav className="flex flex-col gap-4">
          <NavLink to="/admin/dashboard" className={linkClass}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            👥 Users
          </NavLink>

          <button
            onClick={logout}
            className="mt-10 bg-red-600 hover:bg-red-700 p-3 rounded-lg"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
