import {
  StickyNote,
  CheckSquare,
  LogOut,
  X
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const UserSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded transition
     ${isActive ? "bg-blue-800" : "hover:bg-blue-700"}`;

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 w-64 bg-blue-600 text-white min-h-screen p-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">HiddenInk</h2>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        <nav className="space-y-4">
          <NavLink
            to="/user/dashboard"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <StickyNote size={20} />
            Notes
          </NavLink>

          <NavLink
            to="/user/todos"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <CheckSquare size={20} />
            Todos
          </NavLink>

          <hr className="border-blue-400 my-6" />

          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-red-600 w-full"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
