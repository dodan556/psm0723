import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProjectCard from "../components/public/ProjectCard";
import { getProjects } from "../services/project.service";
import type { Project } from "../types/project";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.project_type === selectedCategory
        );

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

      {/* Filter */}
      <div className="mb-14 flex flex-wrap gap-3">
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

      {/* Grid */}
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
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
        ))}
      </div>
    </section>
  );
}