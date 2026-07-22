import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import {
  getProjects,
  deleteProject,
} from "../../services/project.service";

import type { Project } from "../../types/project";

import ProjectForm from "../../components/admin/ProjectForm";
import AdminHeader from "../../components/admin/ui/AdminHeader";
import StatusBadge from "../../components/admin/ui/StatusBadge";
import Button from "../../components/ui/Button";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("전체");

  async function loadProjects() {
  try {
    const data = await getProjects();
    setProjects(data);
  } catch (error) {
    console.error(error);
    alert("프로젝트를 불러오지 못했습니다.");
  } finally {
    setLoading(false);
  }
}
async function handleDelete(id: string) {
  const ok = confirm("정말 삭제하시겠습니까?");

  if (!ok) return;

  try {
    await deleteProject(id);

    alert("삭제되었습니다.");

    await loadProjects();
  } catch (error) {
    console.error(error);
    alert("삭제 실패");
  }
}
useEffect(() => {
  loadProjects();
}, []);
const categories = [
  "전체",
  ...new Set(projects.map((project) => project.category)),
];
const filteredProjects = projects.filter((project) => {
  const keyword = search.toLowerCase();

  const matchesSearch =
    project.title.toLowerCase().includes(keyword) ||
    project.category.toLowerCase().includes(keyword);

  const matchesCategory =
    categoryFilter === "전체" ||
    project.category === categoryFilter;

  return matchesSearch && matchesCategory;
});
  if (loading) {
    return <p>불러오는 중...</p>;
  }

  return (
    <div>
      <AdminHeader
  title="Projects"
  description="포트폴리오 프로젝트를 관리합니다."
  count={projects.length}
  buttonText="+ 새 프로젝트"
  onButtonClick={() => {
    setSelectedProject(undefined);
    setShowUploader(true);
  }}
/>
<div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div className="flex flex-1 gap-3">
    <input
      type="text"
      placeholder="프로젝트 검색..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-zinc-300 px-4 py-2 outline-none transition focus:border-black"
    />

    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="rounded-xl border border-zinc-300 px-4 py-2 outline-none transition focus:border-black"
    >
      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  </div>

  <span className="text-sm text-zinc-500">
    총 {filteredProjects.length}개
  </span>
</div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-zinc-50">
            <tr>
              <th className="p-4 text-left">썸네일</th>
              <th className="p-4 text-left">제목</th>
              <th className="p-4 text-left">카테고리</th>
              <th className="p-4 text-left">공개</th>
             <th className="p-4 text-center">관리</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
  <tr
    key={project.id}
    className="border-b border-zinc-200 transition-colors hover:bg-zinc-50"
  >
    <td className="p-4">
      <img
        src={project.thumbnail || ""}
        alt={project.title}
        className="h-20 w-20 rounded-xl border border-zinc-200 object-cover shadow-sm"
      />
    </td>

    <td className="p-4 font-medium">
      {project.title}
    </td>

    <td className="p-4">
      {project.category}
    </td>

    <td className="p-4">
  <StatusBadge published={project.published} />
</td>

    <td className="p-4">
      <div className="flex justify-center gap-2">
       <Button
  onClick={() => {
    setSelectedProject(project);
    setShowUploader(true);
  }}
>
  수정
</Button>

        <Button
  variant="secondary"
  onClick={() => handleDelete(project.id)}
>
  삭제
</Button>
      </div>
    </td>
  </tr>
))
            )}
          </tbody>
        </table>
      </div>
            <Modal
        open={showUploader}
        title={selectedProject ? "프로젝트 수정" : "새 프로젝트"}
        onClose={() => {
          setShowUploader(false);
          setSelectedProject(undefined);
        }}
      >
        <ProjectForm
          mode={selectedProject ? "edit" : "create"}
          project={selectedProject}
          onSaved={async () => {
            setShowUploader(false);
            setSelectedProject(undefined);
            await loadProjects();
          }}
        />
      </Modal>
    </div>
  );
}