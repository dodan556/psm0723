import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`border-b border-zinc-200 px-6 py-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`border-t border-zinc-200 px-6 py-5 ${className}`}
    >
      {children}
    </div>
  );
}