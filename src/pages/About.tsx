import { useEffect, useState } from "react";

import { getAbout } from "../services/about.service";
import type { About as AboutType } from "../types/about";

export default function About() {
  const [about, setAbout] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getAbout();
      setAbout(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (!about) {
    return <p className="p-10">데이터가 없습니다.</p>;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[250px_1fr]">
        <div>
          {about.profile_image && (
            <img
              src={about.profile_image}
              alt={about.name}
              className="h-64 w-64 rounded-xl object-cover"
            />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold">
              {about.name}
            </h1>

            <p className="mt-2 text-xl text-zinc-500">
              {about.job_title}
            </p>
          </div>

          <p className="leading-8">
            {about.intro}
          </p>

          {about.skills.length > 0 && (
            <div>
              <h2 className="mb-3 text-xl font-semibold">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {about.career && (
            <div>
              <h2 className="mb-3 text-xl font-semibold">
                Career
              </h2>

              <p>{about.career}</p>
            </div>
          )}

          {about.resume_url && (
            <a
              href={about.resume_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg bg-black px-5 py-3 text-white"
            >
              Resume
            </a>
          )}
        </div>
      </div>
    </main>
  );
}