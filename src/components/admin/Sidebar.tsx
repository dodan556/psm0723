import { NavLink } from "react-router-dom";
import { signOut } from "../../services/auth.service";

export default function Sidebar() {
  async function handleLogout() {
    await signOut();
    window.location.href = "/admin/login";
  }

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Portfolio CMS
      </h1>

      <nav className="space-y-2">

        <NavLink
          to="/admin/dashboard"
          className="block rounded px-4 py-3 hover:bg-slate-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/projects"
          className="block rounded px-4 py-3 hover:bg-slate-700"
        >
          Projects
        </NavLink>

        <NavLink
          to="/admin/categories"
          className="block rounded px-4 py-3 hover:bg-slate-700"
        >
          Categories
        </NavLink>

        <NavLink
          to="/admin/contact"
          className="block rounded px-4 py-3 hover:bg-slate-700"
        >
          Contact
        </NavLink>

      </nav>

      <button
        onClick={handleLogout}
        className="mt-12 w-full rounded bg-red-600 py-3"
      >
        Logout
      </button>
    </aside>
  );
}