import { motion } from "framer-motion";

import type { Project } from "../../types/project";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface Props {
  project: Project;
}

export default function ProjectHero({ project }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-24"
    >
      {project.project_type && <Badge>{project.project_type}</Badge>}

      <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-zinc-900 md:text-7xl">
        {project.title}
      </h1>

      <p className="mt-6 max-w-3xl text-xl leading-9 text-zinc-500">
        {project.summary}
      </p>

      {project.tools && project.tools.length > 0 && (
  <div className="mt-10">
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
      TOOLS
    </p>

    <div className="flex flex-wrap gap-3">
      {project.tools.map((tool) => (
        <span
          key={tool}
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black"
        >
          {tool}
        </span>
      ))}
    </div>
  </div>
)}

      <div className="mt-12 flex flex-wrap gap-5">
        {project.github && (
          <Button href={project.github}>GitHub</Button>
        )}

        {project.live_url && (
          <Button
            href={project.live_url}
            variant="secondary"
          >
            Live Demo
          </Button>
        )}
      </div>

      {project.thumbnail && (
        <div className="mt-16 overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-2xl">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full transition duration-700 hover:scale-[1.03]"
          />
        </div>
      )}
    </motion.header>
  );
}