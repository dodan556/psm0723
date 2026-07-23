import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="페이지를 찾을 수 없습니다."
      />

      <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl font-bold text-gray-900"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-3xl font-semibold"
        >
          페이지를 찾을 수 없습니다.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 max-w-md text-gray-500"
        >
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <Link
            to="/"
            className="mt-8 inline-flex rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90"
          >
            홈으로 돌아가기
          </Link>
        </motion.div>
      </section>
    </>
  );
}