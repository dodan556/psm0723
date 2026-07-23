import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getHomeSettings } from "../../services/home.service";
import type { HomeSettings } from "../../types/home";

export default function Hero() {
  const [home, setHome] = useState<HomeSettings | null>(null);

  useEffect(() => {
    loadHome();
  }, []);

  async function loadHome() {
    try {
      const data = await getHomeSettings();
      setHome(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!home) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gray-500">
        {home.hero_subtitle}
      </p>

      <h1 className="mb-6 text-6xl font-bold">
        {home.title}
      </h1>

      <p className="mb-10 max-w-2xl whitespace-pre-line text-lg leading-8 text-gray-600">
        {home.hero_description}
      </p>

      <div className="flex gap-4">
        <Link
          to={home.primary_button_link || "/portfolio"}
          className="rounded-full bg-black px-8 py-4 text-white transition hover:bg-gray-800"
        >
          {home.primary_button_text}
        </Link>

        {home.secondary_button_text && (
          <Link
            to={home.secondary_button_link || "/contact"}
            className="rounded-full border border-gray-300 px-8 py-4 transition hover:bg-gray-100"
          >
            {home.secondary_button_text}
          </Link>
        )}
      </div>
    </section>
  );
}