import { useState } from "react";
import { uploadProjectImage } from "../../services/storage.service";

interface Props {
  onUploadComplete: (url: string) => void;
}

export default function ImageUploader({ onUploadComplete }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);

const url = URL.createObjectURL(selected);

setPreview(url);

setIsVideo(selected.type.startsWith("video/"));
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadProjectImage(file);

      onUploadComplete(url);

      alert("업로드 완료!");
    } catch (err) {
  console.error(err);

  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("알 수 없는 오류");
  }
} finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">

      <input
        type="file"
        accept="image/*,video/mp4,video/webm,video/quicktime"
        onChange={handleSelect}
      />

      {preview &&
  (isVideo ? (
    <video
      src={preview}
      controls
      className="w-64 rounded border"
    />
  ) : (
    <img
      src={preview}
      alt="preview"
      className="w-64 rounded border"
    />
  ))}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {uploading ? "업로드 중..." : "업로드"}
      </button>

    </div>
  );
}