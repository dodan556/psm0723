import { useEffect, useState } from "react";
import {
  getProjects,
  deleteProject,
} from "../../services/project.service";
import type { Project } from "../../types/project";
import ProjectForm from "../../components/admin/ProjectForm";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

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

  if (loading) {
    return <p>불러오는 중...</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>

        <button
  onClick={() => {
  setSelectedProject(undefined);
  setShowUploader(true);
}}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
  + 새 프로젝트
        </button> 
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">썸네일</th>
              <th className="p-4 text-left">제목</th>
              <th className="p-4 text-left">카테고리</th>
              <th className="p-4 text-left">공개</th>
             <th className="p-4 text-center">관리</th>
            </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  등록된 프로젝트가 없습니다.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
  <tr
    key={project.id}
    className="border-t hover:bg-gray-50"
  >
    <td className="p-4">
      <img
        src={project.thumbnail || ""}
        alt={project.title}
        className="h-16 w-16 rounded border object-cover"
      />
    </td>

    <td className="p-4 font-medium">
      {project.title}
    </td>

    <td className="p-4">
      {project.category}
    </td>

    <td className="p-4">
      {project.published ? "공개" : "비공개"}
    </td>

    <td className="p-4">
      <div className="flex justify-center gap-2">
        <button
  onClick={() => {
    setSelectedProject(project);
    setShowUploader(true);
  }}
  className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
>
  수정
</button>

        <button
  onClick={() => handleDelete(project.id)}
  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
>
  삭제
</button>
      </div>
    </td>
  </tr>
))
            )}
          </tbody>
        </table>
      </div>
      {showUploader && (
  <div className="mt-8">
    <ProjectForm
  mode={selectedProject ? "edit" : "create"}
  project={selectedProject}
  onSaved={async () => {
    setShowUploader(false);
    setSelectedProject(undefined);
    await loadProjects();
  }}
/>
  </div>
)}
    </div>
  );
}