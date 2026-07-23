import { useEffect, useState } from "react";

import StatCard from "../../components/admin/StatCard";

import { getProjectsStats } from "../../services/project.service";

export default function Dashboard() {
  type DashboardStats = {
  total: number;
  featured: number;
  published: number;
  categories: number;
  latest: {
    id: string;
    title: string;
    project_type: string | null;
    published: boolean;
  }[];
};

const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProjectsStats();
    setStats(data);
  }

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
  title="Projects"
  value={stats.total}
  icon="📁"
/>

<StatCard
  title="Featured"
  value={stats.featured}
  icon="⭐"
/>

<StatCard
  title="Published"
  value={stats.published}
  icon="🚀"
/>

<StatCard
  title="Categories"
  value={stats.categories}
  icon="🏷️"
/>

      </div>

      <div className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          최근 프로젝트
        </h2>

        <div className="space-y-4">

          {stats.latest.map((project) => (

            <div
              key={project.id}
              className="flex items-center justify-between border-b pb-3"
            >

              <div>

                <p className="font-semibold">
                  {project.title}
                </p>

                <p className="text-sm text-gray-500">
                  {project.project_type}
                </p>

              </div>

              <span className="rounded bg-slate-100 px-3 py-1 text-sm">
                {project.published ? "공개" : "비공개"}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}