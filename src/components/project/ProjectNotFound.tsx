import { Link } from "react-router-dom";

export default function ProjectNotFound() {
  return (
    <section className="mx-auto max-w-5xl py-24 text-center">
      <h2 className="text-3xl font-bold">
        프로젝트를 찾을 수 없습니다.
      </h2>

      <Link
        to="/portfolio"
        className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 text-white"
      >
        Portfolio로 돌아가기
      </Link>
    </section>
  );
}