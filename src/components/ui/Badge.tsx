interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
      {children}
    </span>
  );
}