import { useEffect, useState } from "react";

import { getContact } from "../services/contact.service";
import type { Contact as ContactType } from "../types/contact";

export default function Contact() {
  const [contact, setContact] = useState<ContactType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getContact();
      setContact(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (!contact) {
    return <p className="p-10">데이터가 없습니다.</p>;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-10 text-4xl font-bold">
        Contact
      </h1>

      <div className="space-y-6 rounded-xl border p-8">

        <div>
          <h2 className="font-semibold">Email</h2>
          <p>{contact.email || "-"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Phone</h2>
          <p>{contact.phone || "-"}</p>
        </div>

        <div>
          <h2 className="font-semibold">GitHub</h2>

          {contact.github ? (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {contact.github}
            </a>
          ) : (
            "-"
          )}
        </div>

        <div>
          <h2 className="font-semibold">YouTube</h2>

          {contact.youtube ? (
            <a
              href={contact.youtube}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {contact.youtube}
            </a>
          ) : (
            "-"
          )}
        </div>

        <div>
          <h2 className="font-semibold">Blog</h2>

          {contact.blog ? (
            <a
              href={contact.blog}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {contact.blog}
            </a>
          ) : (
            "-"
          )}
        </div>

        <div>
          <h2 className="font-semibold">Instagram</h2>

          {contact.instagram ? (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {contact.instagram}
            </a>
          ) : (
            "-"
          )}
        </div>

        <div>
          <h2 className="font-semibold">Location</h2>
          <p>{contact.location || "-"}</p>
        </div>

      </div>
    </main>
  );
}