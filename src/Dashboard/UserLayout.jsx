import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const UserLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header */}
        <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
          <h2 className="font-bold text-lg">HiddenInk</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
