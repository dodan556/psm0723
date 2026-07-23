import type { ReactNode } from "react";

interface AdminPageProps {
  title: string;
  children: ReactNode;
}

export default function AdminPage({
  title,
  children,
}: AdminPageProps) {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {children}
      </div>

    </div>
  );
}