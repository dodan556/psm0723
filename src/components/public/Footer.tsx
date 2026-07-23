import { useEffect, useState } from "react";

import { useSettings } from "../../contexts/SettingsContext";
import { getContact } from "../../services/contact.service";
import type { Contact } from "../../types/contact";

export default function Footer() {
  const { settings } = useSettings();

  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getContact();
        setContact(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div>
          <p className="text-sm text-gray-500">
            {settings?.footer_text || "Portfolio"}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {settings?.copyright ||
              "© 2026 PARK SEONGMI. All rights reserved."}
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          {contact?.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-black"
            >
              GitHub
            </a>
          )}

          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              className="text-gray-500 transition hover:text-black"
            >
              Email
            </a>
          )}

          {contact?.youtube && (
            <a
              href={contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-black"
            >
              YouTube
            </a>
          )}

          {contact?.blog && (
            <a
              href={contact.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-black"
            >
              Blog
            </a>
          )}

          {contact?.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-black"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}