import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getSettings } from "../services/settings.service";
import type { Settings } from "../types/settings";

interface SettingsContextValue {
  settings: Settings | null;
  loading: boolean;
  reload: () => Promise<void>;
}

const SettingsContext = createContext<
  SettingsContextValue | undefined
>(undefined);

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // 브라우저 제목 변경
  useEffect(() => {
    if (!settings) return;

    document.title = settings.site_title || "Portfolio";
  }, [settings]);

  // Favicon 자동 변경
  useEffect(() => {
    if (!settings?.favicon_url) return;

    let link = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = settings.favicon_url;
  }, [settings?.favicon_url]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        reload: load,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}