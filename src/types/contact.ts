export interface Contact {
  id: string;

  email: string | null;
  phone: string | null;

  github: string | null;
  youtube: string | null;
  blog: string | null;
  instagram: string | null;

  location: string | null;

  updated_at: string;
}