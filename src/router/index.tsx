import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Public Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Portfolio from "../pages/Portfolio";
import ProjectDetail from "../pages/ProjectDetail";
import Contact from "../pages/Contact";

// Admin Pages
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Projects from "../pages/admin/Projects";
import AdminHome from "../pages/admin/Home";
import AdminAbout from "../pages/admin/About";
import AdminContact from "../pages/admin/Contact";
import Settings from "../pages/admin/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "portfolio/:slug",
        element: <ProjectDetail />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "home",
            element: <AdminHome />,
          },
          {
            path: "about",
            element: <AdminAbout />,
          },
          {
            path: "contact",
            element: <AdminContact />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
   {
    path: "*",
    element: <NotFound />,
  },
]);