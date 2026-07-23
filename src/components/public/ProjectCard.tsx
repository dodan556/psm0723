import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-2xl"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/30" />

          {/* Category */}
          {project.project_type && (
            <div className="absolute left-5 top-5">
              <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-gray-900 backdrop-blur">
                {project.project_type}
              </span>
            </div>
          )}

          {/* View Project */}
          <div className="absolute bottom-6 left-6 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-sm font-semibold text-white">
              View Project
            </span>

            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
              }}
              className="text-white"
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-7">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 transition group-hover:text-black">
              {project.title}
            </h3>

            <p className="mt-3 line-clamp-2 leading-7 text-gray-500">
              {project.summary}
            </p>
          </div>

          {project.tools && project.tools.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition duration-300 group-hover:bg-black group-hover:text-white"
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