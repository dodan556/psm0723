import Button from "../ui/Button";

interface SaveBarProps {
  loading?: boolean;
  onSave: () => void;
}

export default function SaveBar({
  loading = false,
  onSave,
}: SaveBarProps) {
  return (
    <div className="mt-8 flex justify-end">

      <Button
        onClick={onSave}
        disabled={loading}
      >
        {loading ? "저장 중..." : "저장"}
      </Button>

    </div>
  );
}