import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-50 p-6">
        <h2 className="mb-8 text-2xl font-bold">
          Admin
        </h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/projects">Projects</NavLink>
          <NavLink to="/admin/home">Home</NavLink>
          <NavLink to="/admin/about">About</NavLink>
          <NavLink to="/admin/contact">Contact</NavLink>
          <NavLink to="/admin/settings">Settings</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}