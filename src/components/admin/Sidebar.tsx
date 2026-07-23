import { NavLink } from "react-router-dom";
import { signOut } from "../../services/auth.service";

export default function Sidebar() {
  async function handleLogout() {
    await signOut();
    window.location.href = "/admin/login";
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded px-4 py-3 transition ${
      isActive
        ? "bg-slate-700 text-white"
        : "hover:bg-slate-800 text-slate-300"
    }`;

  return (
    <aside className="min-h-screen w-64 bg-slate-900 p-6 text-white">
      <h1 className="mb-10 text-2xl font-bold">
        Portfolio CMS
      </h1>

      <nav className="space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={linkClass}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/projects"
          className={linkClass}
        >
          📁 Projects
        </NavLink>

        <NavLink
          to="/admin/home"
          className={linkClass}
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/admin/about"
          className={linkClass}
        >
          👤 About
        </NavLink>

        <NavLink
          to="/admin/contact"
          className={linkClass}
        >
          ✉ Contact
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={linkClass}
        >
          ⚙ Settings
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-12 w-full rounded-lg bg-red-600 py-3 transition hover:bg-red-700"
      >
        Logout
      </button>
    </aside>
  );
}