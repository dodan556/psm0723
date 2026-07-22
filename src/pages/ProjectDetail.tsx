import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProjectLoading from "../components/project/ProjectLoading";
import ProjectNotFound from "../components/project/ProjectNotFound";
import ImageLightbox from "../components/public/ImageLightbox";
import { useProjectDetail } from "../hooks/useProjectDetail";

export default function ProjectDetail() {
  const { slug } = useParams();

  const { project, media, loading } = useProjectDetail(slug);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex - 1 + media.length) % media.length
    );
  };

  const handleNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex + 1) % media.length
    );
  };

  if (loading) {
    return <ProjectLoading />;
  }

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <>
      <section className="mx-auto max-w-6xl py-16">

        {/* 대표 이미지 */}
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="mb-10 w-full rounded-3xl object-cover"
          />
        )}

        {/* 제목 */}
        <div className="mb-10">

          {project.project_type && (
            <span className="rounded-full bg-black px-4 py-1 text-sm text-white">
              {project.project_type}
            </span>
          )}

          <h1 className="mt-5 text-5xl font-bold">
            {project.title}
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            {project.summary}
          </p>

        </div>

        {/* Tool */}
        {project.tools && project.tools.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* 버튼 */}
        <div className="mb-16 flex flex-wrap gap-4">

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-black px-6 py-3 text-white"
            >
              GitHub
            </a>
          )}

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border px-6 py-3"
            >
              Live Demo
            </a>
          )}

        </div>

        {/* 본문 */}
        <article className="prose prose-lg max-w-none whitespace-pre-wrap">
          {project.content}
        </article>

        {/* 상세 이미지 */}
        {media.length > 0 && (
          <div className="mt-20 space-y-8">
            {media.map((item, index) => (
              <motion.img
                key={item.id}
                src={item.image_url}
                alt={project.title}
                loading="lazy"
                onClick={() => setSelectedIndex(index)}
                className="w-full cursor-zoom-in rounded-2xl transition hover:opacity-95"
              />
            ))}
          </div>
        )}
      </section>

      {selectedIndex !== null && (
        <ImageLightbox
          images={media.map((item) => item.image_url)}
          currentIndex={selectedIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}