interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-3xl">{icon}</div>

      <p className="text-sm text-zinc-500">{title}</p>

      <h2 className="mt-2 text-4xl font-bold">{value}</h2>
    </div>
  );
}