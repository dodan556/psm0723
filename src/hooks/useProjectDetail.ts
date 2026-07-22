import { useEffect, useState } from "react";

import { getProjectBySlug } from "../services/project.service";
import {
  getProjectMedia,
  type ProjectMedia,
} from "../services/projectImage.service";

import type { Project } from "../types/project";

export function useProjectDetail(slug?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      setMedia([]);
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
          return;
        }

        const mediaData = await getProjectMedia(projectData.id);

        if (!isMounted) return;

        setProject(projectData);
        setMedia(mediaData);
      } catch (error) {
        console.error(error);

        if (!isMounted) return;

        setProject(null);
        setMedia([]);
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
    loading,
  };
}