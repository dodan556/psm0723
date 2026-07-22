import Button from "../../ui/Button";

interface AdminHeaderProps {
  title: string;
  description?: string;
  count?: number;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function AdminHeader({
  title,
  description,
  count,
  buttonText,
  onButtonClick,
}: AdminHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-zinc-500">
            {description}
          </p>
        )}

        {count !== undefined && (
          <p className="mt-3 text-sm font-medium text-zinc-400">
            {count} Projects
          </p>
        )}
      </div>

      {buttonText && (
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}