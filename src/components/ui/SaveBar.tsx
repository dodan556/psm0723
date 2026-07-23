import Button from "./Button";

interface SaveBarProps {
  loading?: boolean;
  onSave: () => void;
}

export default function SaveBar({
  loading = false,
  onSave,
}: SaveBarProps) {
  return (
    <div className="sticky bottom-0 mt-8 flex justify-end border-t border-zinc-200 bg-white px-6 py-4">
      <Button
        onClick={onSave}
        disabled={loading}
      >
        {loading ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
}