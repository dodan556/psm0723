interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  eyebrow = "Portfolio",
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-16">
      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
        {eyebrow}
      </span>

      <h2 className="mt-4 text-5xl font-bold tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}