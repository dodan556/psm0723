import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {project.project_type && (
            <div className="absolute left-5 top-5">
              <span className="rounded-full bg-black/80 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur">
                {project.project_type}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-5 p-7">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              {project.title}
            </h3>

            <p className="mt-3 line-clamp-2 leading-7 text-gray-500">
              {project.summary}
            </p>
          </div>

          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition group-hover:bg-black group-hover:text-white"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}