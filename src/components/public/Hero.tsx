import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gray-500">
        WEB DESIGNER
      </p>

      <h1 className="mb-6 text-6xl font-bold">
        PARK SEONGMI
      </h1>

      <p className="mb-10 max-w-2xl text-lg leading-8 text-gray-600">
        브랜드와 제품의 가치를 높이는
        <br />
        웹디자이너 포트폴리오입니다.
      </p>

      <Link
        to="/portfolio"
        className="rounded-full bg-black px-8 py-4 text-white transition hover:bg-gray-800"
      >
        Portfolio 보기
      </Link>
    </section>
  );
}