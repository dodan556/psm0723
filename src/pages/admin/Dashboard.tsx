export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-8 shadow">
          <p className="text-gray-500">Projects</p>

          <h2 className="mt-3 text-4xl font-bold">
            0
          </h2>
        </div>

        <div className="rounded-xl bg-white p-8 shadow">
          <p className="text-gray-500">Categories</p>

          <h2 className="mt-3 text-4xl font-bold">
            0
          </h2>
        </div>
      </div>
    </div>
  );
}