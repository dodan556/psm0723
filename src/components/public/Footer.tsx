export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <p className="text-sm text-gray-500">
          © 2026 PARK SEONGMI. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition hover:text-black"
          >
            GitHub
          </a>

          <a
            href="mailto:your@email.com"
            className="text-gray-500 transition hover:text-black"
          >
            Email
          </a>

          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition hover:text-black"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}