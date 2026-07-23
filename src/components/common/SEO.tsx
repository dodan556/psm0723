import { Helmet } from "react-helmet-async";
import { useSettings } from "../../contexts/SettingsContext";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

export default function SEO({
  title,
  description,
  image,
}: Props) {
  const { settings } = useSettings();

  const seoTitle =
    title ??
    settings?.seo_title ??
    settings?.site_title ??
    "Portfolio";

  const seoDescription =
    description ??
    settings?.seo_description ??
    "";

  const seoImage =
    image ??
    settings?.og_image ??
    "";

  return (
    <Helmet>
      <title>{seoTitle}</title>

      <meta
        name="description"
        content={seoDescription}
      />

      <meta
        property="og:title"
        content={seoTitle}
      />

      <meta
        property="og:description"
        content={seoDescription}
      />

      <meta
        property="og:image"
        content={seoImage}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={seoTitle}
      />

      <meta
        name="twitter:description"
        content={seoDescription}
      />

      <meta
        name="twitter:image"
        content={seoImage}
      />
    </Helmet>
  );
}