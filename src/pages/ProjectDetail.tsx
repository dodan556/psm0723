import SEO from "../components/common/SEO";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";

import ProjectHero from "../components/project/ProjectHero";
import ProjectLoading from "../components/public/ProjectLoading";
import ProjectNotFound from "../components/project/ProjectNotFound";
import ImageLightbox from "../components/public/ImageLightbox";
import ProjectCard from "../components/public/ProjectCard";

import { useProjectDetail } from "../hooks/useProjectDetail";

export default function ProjectDetail() {
  const { slug } = useParams();

  const {
    project,
    media,
    relatedProjects,
    loading,
  } = useProjectDetail(slug);

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
      <SEO
        title={project.title}
        description={project.summary}
        image={project.thumbnail ?? undefined}
      />

      <section className="mx-auto max-w-6xl py-16">

        <ProjectHero project={project} />

        {/* Content */}
        <article className="prose prose-lg max-w-none whitespace-pre-wrap">
          {project.content}
        </article>

        {/* Detail Images */}
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

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-28">
            <div className="mb-10">
              <h2 className="text-3xl font-bold">
                Related Projects
              </h2>

              <p className="mt-2 text-gray-500">
                비슷한 유형의 다른 프로젝트도 확인해보세요.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((item) => (
                <ProjectCard
                  key={item.id}
                  project={item}
                />
              ))}
            </div>
          </section>
        )}

      </section>

      {/* Lightbox */}
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