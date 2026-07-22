import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function Button({
  children,
  href,
  to,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300";

  const styles = {
    primary:
      "bg-black text-white hover:-translate-y-0.5 hover:bg-neutral-800",

    secondary:
      "border border-gray-300 bg-white text-gray-900 hover:border-black hover:bg-gray-50",

    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-black",
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`${base} ${styles[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}