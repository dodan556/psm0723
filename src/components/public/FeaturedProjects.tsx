import { useEffect, useState } from "react";

import { getProjects } from "../../services/project.service";
import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();

      setProjects(
        data.filter(
          (project) => project.featured && project.published
        )
      );
    }

    loadProjects();
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Featured Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  {projects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
    />
  ))}
</div>
        </div>
      </div>
    </section>
  );
}