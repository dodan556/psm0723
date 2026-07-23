export interface HomeSettings {
  id: string;

  title: string;

  hero_subtitle: string | null;
  hero_description: string | null;

  primary_button_text: string | null;
  primary_button_link: string | null;

  secondary_button_text: string | null;
  secondary_button_link: string | null;

  featured_count: number;

  stat_projects: number;
  stat_clients: number;
  stat_years: number;

  updated_at: string | null;
}