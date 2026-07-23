export interface Settings {
  id: string;

  site_title: string | null;
  logo_url: string | null;
  favicon_url: string | null;

  site_description: string | null;
  seo_title: string | null;
  seo_description: string | null;

  footer_text: string | null;
  copyright: string | null;
  og_image: string | null;

  updated_at: string;
}