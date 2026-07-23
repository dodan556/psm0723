export interface Project {
  id: string;
  title: string;
  slug: string;
  project_type: string | null;
  category: string;
  summary: string;
  content: string;
  thumbnail: string | null;
  tools: string[] | null;
  github: string | null;
  live_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
