interface StatusBadgeProps {
  published: boolean;
}

export default function StatusBadge({
  published,
}: StatusBadgeProps) {
  if (published) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        Public
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
      Draft
    </span>
  );
}