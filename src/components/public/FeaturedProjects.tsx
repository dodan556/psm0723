import { useEffect, useState } from "react";

import { getProjects } from "../../services/project.service";
import { getHomeSettings } from "../../services/home.service";

import type { Project } from "../../types/project";

import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const [allProjects, home] = await Promise.all([
        getProjects(),
        getHomeSettings(),
      ]);

      const featured = allProjects
        .filter(
          (project) =>
            project.featured &&
            project.published
        )
        .sort(
          (a, b) =>
            a.sort_order - b.sort_order
        )
        .slice(0, home.featured_count);

      setProjects(featured);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Featured Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}