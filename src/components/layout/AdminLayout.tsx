import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}