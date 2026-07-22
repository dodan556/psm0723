import { Outlet } from "react-router-dom";

import Header from "../components/public/Header";
import Footer from "../components/public/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}