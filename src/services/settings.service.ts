import { supabase } from "../lib/supabase";
import type { Settings } from "../types/settings";

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) throw error;

  return data as Settings;
}

export async function updateSettings(
  values: Partial<Settings>
) {
  const current = await getSettings();

  const { id, updated_at, ...updateData } = values;

  const { error } = await supabase
    .from("settings")
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id);

  if (error) throw error;
}