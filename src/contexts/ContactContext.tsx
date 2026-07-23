import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getContact } from "../services/contact.service";
import type { Contact } from "../types/contact";

interface ContactContextValue {
  contact: Contact | null;
  loading: boolean;
  reload: () => Promise<void>;
}

const ContactContext = createContext<ContactContextValue | undefined>(
  undefined
);

export function ContactProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    load();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contact,
        loading,
        reload: load,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error(
      "useContact must be used inside ContactProvider"
    );
  }

  return context;
}