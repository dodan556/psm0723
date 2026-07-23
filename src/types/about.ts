export interface About {
  id: string;

  name: string;

  job_title: string | null;
  intro: string | null;

  profile_image: string | null;

  skills: string[];

  career: string | null;

  resume_url: string | null;

  updated_at: string;
}