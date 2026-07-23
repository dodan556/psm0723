import { Link, NavLink } from "react-router-dom";
import { useSettings } from "../../contexts/SettingsContext";

export default function Header() {
  const { settings } = useSettings();

  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          {settings?.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.site_title || "Logo"}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold tracking-wide">
              {settings?.site_title || "PARK SEONGMI"}
            </span>
          )}
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "text-black"
                  : "text-gray-500 transition-colors hover:text-black"
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