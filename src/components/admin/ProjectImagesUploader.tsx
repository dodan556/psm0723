import { useEffect, useState } from "react";
import {
  getProjectMedia,
  deleteProjectMedia,
  uploadProjectMedia,
} from "../../services/projectImage.service";

interface Props {
  projectId: string;
}

interface ProjectMedia {
  id: string;
  image_url: string;
  sort_order: number;
}

export default function ProjectImagesUploader({
  projectId,
}: Props) {
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function loadMedia() {
    try {
      const data = await getProjectMedia(projectId);
      setMedia(data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (projectId) {
      loadMedia();
    }
  }, [projectId]);

  async function handleDelete(id: string) {
    if (!confirm("삭제하시겠습니까?")) return;

    await deleteProjectMedia(id);
    loadMedia();
  }
async function handleUpload(file: File) {
  try {
    setUploading(true);

    await uploadProjectMedia(
      projectId,
      file,
      media.length
    );

    await loadMedia();
  } finally {
    setUploading(false);
  }
}
  if (loading) {
    return <p>불러오는 중...</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">상세 이미지</h3>
      <input
  type="file"
  accept="image/*"
  disabled={uploading}
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleUpload(file);

    e.target.value = "";
  }}
/>

      {media.length === 0 ? (
        <p className="text-gray-500">등록된 이미지가 없습니다.</p>
      ) : (
        media.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-lg p-3"
          >
            <img
              src={item.image_url}
              alt=""
              className="w-28 h-28 object-cover rounded"
            />

            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              삭제
            </button>
          </div>
        ))
      )}
    </div>
  );
}