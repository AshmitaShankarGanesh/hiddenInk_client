import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between bg-blue-700 text-white p-4">
          <button onClick={() => setOpen(true)}>☰</button>
          <h1 className="font-bold">HiddenInk Admin</h1>
        </div>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
