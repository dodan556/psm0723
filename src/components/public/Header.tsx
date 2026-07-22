import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide"
        >
          PARK SEONGMI
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "text-black"
                  : "text-gray-500 hover:text-black transition-colors"
              }
            >
              {menu.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}