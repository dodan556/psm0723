import {
  createProject,
  updateProject,
} from "../../services/project.service";
import { useEffect, useState } from "react";
import type { Project } from "../../types/project";
import ImageUploader from "./ImageUploader";
import ProjectImagesUploader from "./ProjectImagesUploader";

interface ProjectFormProps {
  onSaved: () => void;
  mode?: "create" | "edit";
  project?: Project;
}

export default function ProjectForm({
  onSaved,
  mode = "create",
  project,
}: ProjectFormProps) {
  const [title, setTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
const [github, setGithub] = useState("");
const [liveUrl, setLiveUrl] = useState("");
const [tools, setTools] = useState("");
const [featured, setFeatured] = useState(false);
const [published, setPublished] = useState(true);
const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
  if (mode === "edit" && project) {
    setTitle(project.title);
    setProjectType(project.project_type ?? "");
    setCategory(project.category);
    setSummary(project.summary);
    setThumbnail(project.thumbnail ?? "");

    setContent(project.content);
    setGithub(project.github ?? "");
    setLiveUrl(project.live_url ?? "");
    setTools(project.tools?.join(", ") ?? "");
    setFeatured(project.featured);
    setPublished(project.published);
    setSortOrder(project.sort_order);
  }
}, [mode, project]);

  const handleSave = async () => {
if (!title || !projectType || !category || !summary || !thumbnail) {
      alert("모든 항목을 입력해주세요.");
    return;
  }

  try {
    if (mode === "edit" && project) {
  await updateProject(project.id, {
  title,
    project_type: projectType,
  category,
  summary,
  thumbnail,
  content,
  github,
  live_url: liveUrl,
  tools: tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean),
  featured,
  published,
  sort_order: sortOrder,
});

  alert("프로젝트가 수정되었습니다.");
} else {
  await createProject({
  title,
  project_type: projectType,
  category,
  summary,
  thumbnail,
  content,
  github,
  live_url: liveUrl,
  tools: tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean),
  featured,
  published,
  sort_order: sortOrder,
});

  alert("프로젝트가 저장되었습니다.");
}

    onSaved();

    setTitle("");
    setCategory("");
    setSummary("");
    setThumbnail("");
    setFeatured(false);
setPublished(true);
setSortOrder(0);
  } catch (err: any) {
  console.error(err);

  alert(JSON.stringify(err, null, 2));
}
};

  return (
    <div className="space-y-6 rounded-xl border bg-white p-6">

      <div>
        <label className="mb-2 block font-semibold">
          프로젝트 제목
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border p-3"
        />
      </div>
      <div>
  <label className="mb-2 block font-semibold">
    프로젝트 유형
  </label>

  <select
    value={projectType}
    onChange={(e) => setProjectType(e.target.value)}
    className="w-full rounded border p-3"
  >
    <option value="">선택하세요</option>
    <option value="상세페이지">상세페이지</option>
    <option value="리디자인">리디자인</option>
    <option value="배너">배너</option>
    <option value="3D">3D</option>
    <option value="모션">모션</option>
  </select>
</div>

      <div>
        <label className="mb-2 block font-semibold">
          카테고리
        </label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          설명
        </label>

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="h-32 w-full rounded border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          대표 이미지
        </label>

        <ImageUploader
          onUploadComplete={(url) => {
            setThumbnail(url);
          }}
        />

        {thumbnail && (
          <p className="mt-2 text-sm text-green-600">
            이미지 업로드 완료
          </p>
        )}
      </div>
      <div>
  <label className="mb-2 block font-semibold">
    본문
  </label>

  <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    className="h-48 w-full rounded border p-3"
  />
</div>
{mode === "edit" && project && (
  <ProjectImagesUploader projectId={project.id} />
)}
<div>
  <label className="mb-2 block font-semibold">
    GitHub
  </label>

  <input
    value={github}
    onChange={(e) => setGithub(e.target.value)}
    className="w-full rounded border p-3"
    placeholder="https://github.com/..."
  />
</div>
<div>
  <label className="mb-2 block font-semibold">
    Live URL
  </label>

  <input
    value={liveUrl}
    onChange={(e) => setLiveUrl(e.target.value)}
    className="w-full rounded border p-3"
    placeholder="https://..."
  />
</div>
<div>
  <label className="mb-2 block font-semibold">
    사용 툴
  </label>

  <input
    value={tools}
    onChange={(e) => setTools(e.target.value)}
    className="w-full rounded border p-3"
    placeholder="Photoshop, Figma, Blender"
  />

  <p className="mt-1 text-sm text-gray-500">
    쉼표(,)로 구분해서 입력하세요.
  </p>
</div>
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={featured}
    onChange={(e) => setFeatured(e.target.checked)}
  />

  <label>대표 프로젝트</label>
</div>
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={published}
    onChange={(e) => setPublished(e.target.checked)}
  />

  <label>공개</label>
</div>
<div>
  <label className="mb-2 block font-semibold">
    정렬 순서
  </label>

  <input
    type="number"
    value={sortOrder}
    onChange={(e) => setSortOrder(Number(e.target.value))}
    className="w-full rounded border p-3"
  />
</div>

      <button
  onClick={handleSave}
  className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        저장
      </button>

    </div>
  );
}