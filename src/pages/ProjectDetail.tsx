import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectHero from "../components/project/ProjectHero";

import ProjectLoading from "../components/public/ProjectLoading";
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

        <ProjectHero project={project} />

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