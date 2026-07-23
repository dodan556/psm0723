import { supabase } from "../lib/supabase";
import type { Project } from "../types/project";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Project[];
}
export async function createProject(project: {
  title: string;
  project_type: string;
  category: string;
  summary: string;
  thumbnail: string;
  content: string;
  github: string;
  live_url: string;
  tools: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
}) {
  const { data, error } = await supabase
    .from("projects")
    .insert({
  title: project.title,
slug: project.title.toLowerCase().replace(/\s+/g, "-"),
project_type: project.project_type,
category: project.category,
  summary: project.summary,
  thumbnail: project.thumbnail,
  content: project.content,
  tools: project.tools,
  github: project.github,
  live_url: project.live_url,
  featured: project.featured,
  published: project.published,
  sort_order: project.sort_order,
})
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function deleteProject(id: string) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function updateProject(
  id: string,
  project: {
  title: string;
  project_type: string;
  category: string;
  summary: string;
  thumbnail: string;
  content: string;
  github: string;
  live_url: string;
  tools: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
}
) {
  const { error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id);

  if (error) throw error;
}
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data as Project;
}

export async function getProjectsStats() {
  const projects = await getProjects();

  return {
    total: projects.length,

    featured: projects.filter((p) => p.featured).length,

    published: projects.filter((p) => p.published).length,

    categories: new Set(
  projects
    .map((p) => p.project_type)
    .filter(Boolean)
).size,

    latest: [...projects]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
      .slice(0, 5),
  };
}