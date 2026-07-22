import { motion } from "framer-motion";

import type { Project } from "../../types/project";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface Props {
  project: Project;
}

export default function ProjectHero({ project }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-20"
    >
      {project.project_type && (
        <Badge>{project.project_type}</Badge>
      )}

      <h1 className="mt-6 text-5xl font-bold tracking-tight">
        {project.title}
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-500">
        {project.summary}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        {project.github && (
          <Button href={project.github}>
            GitHub
          </Button>
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
        <img
          src={project.thumbnail}
          alt={project.title}
          className="mt-14 w-full rounded-3xl border object-cover shadow-lg"
        />
      )}
    </motion.div>
  );
}