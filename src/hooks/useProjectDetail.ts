import { useEffect, useState } from "react";

import {
  getProjectBySlug,
  getProjects,
} from "../services/project.service";

import {
  getProjectMedia,
  type ProjectMedia,
} from "../services/projectImage.service";

import type { Project } from "../types/project";

export function useProjectDetail(slug?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      setMedia([]);
      setRelatedProjects([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchProject(currentSlug: string) {
      try {
        setLoading(true);

        const projectData = await getProjectBySlug(currentSlug);

        if (!isMounted) return;

        if (!projectData) {
          setProject(null);
          setMedia([]);
          setRelatedProjects([]);
          return;
        }

        const [mediaData, allProjects] = await Promise.all([
          getProjectMedia(projectData.id),
          getProjects(),
        ]);

        if (!isMounted) return;

        const related = allProjects
          .filter(
            (item) =>
              item.published &&
              item.id !== projectData.id &&
              item.project_type === projectData.project_type
          )
          .slice(0, 3);

        setProject(projectData);
        setMedia(mediaData);
        setRelatedProjects(related);
      } catch (error) {
        console.error(error);

        if (!isMounted) return;

        setProject(null);
        setMedia([]);
        setRelatedProjects([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProject(slug);

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return {
    project,
    media,
    relatedProjects,
    loading,
  };
}