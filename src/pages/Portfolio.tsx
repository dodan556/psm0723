import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProjectCard from "../components/public/ProjectCard";
import { getProjects } from "../services/project.service";
import type { Project } from "../types/project";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    async function load() {
      const data = await getProjects();

      setProjects(data.filter((project) => project.published));
    }

    load();
  }, []);

  const categories = [
    "All",
    ...new Set(
      projects
        .map((project) => project.project_type)
        .filter(Boolean)
    ),
  ];

  const filteredProjects = [...projects]
  .filter((project) => {
    const matchCategory =
      selectedCategory === "All" ||
      project.project_type === selectedCategory;

    const keyword = search.toLowerCase();

    const matchSearch =
      project.title.toLowerCase().includes(keyword) ||
      project.summary.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return (
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
        );

      case "name":
        return a.title.localeCompare(b.title);

      case "latest":
      default:
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
    }
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
          Portfolio
        </span>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Selected Works
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
          제품과 브랜드의 가치를 효과적으로 전달하기 위해
          기획부터 디자인까지 제작한 프로젝트입니다.
        </p>
      </motion.div>

      {/* Search */}
<div className="mb-8 flex flex-col gap-4 md:flex-row">
  <input
    type="text"
    placeholder="프로젝트 검색..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 rounded-xl border border-gray-200 px-5 py-3 outline-none transition focus:border-black"
  />

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
  >
    <option value="latest">최신순</option>
    <option value="oldest">오래된순</option>
    <option value="name">이름순</option>
  </select>
</div>

{/* Category */}
<div className="mb-5 flex flex-wrap gap-3">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category ?? "All")}
      className={`rounded-full px-5 py-2 text-sm font-medium transition ${
        selectedCategory === category
          ? "bg-black text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {category}
    </button>
  ))}
</div>

<p className="mb-10 text-sm text-gray-500">
  총 <strong>{filteredProjects.length}</strong>개의 프로젝트
</p>

      {/* Grid */}
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.length === 0 ? (
  <div className="col-span-full py-20 text-center text-gray-400">
    검색 결과가 없습니다.
  </div>
) : (
  filteredProjects.map((project, index) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
    >
      <ProjectCard project={project} />
    </motion.div>
  ))
)}

      </div>
    </section>
  );
}