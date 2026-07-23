import { useEffect, useState } from "react";

import { getSettings } from "../services/settings.service";
import type { Settings } from "../types/settings";

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return {
    settings,
  };
}