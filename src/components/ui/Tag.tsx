interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200">
      {children}
    </span>
  );
}