import { supabase } from "../lib/supabase";
import type { HomeSettings } from "../types/home";

export async function getHomeSettings() {
  const { data, error } = await supabase
    .from("home")
    .select("*")
    .single();

  if (error) throw error;

  return data as HomeSettings;
}

export async function updateHomeSettings(
  data: Partial<HomeSettings>
) {
  const { error } = await supabase
    .from("home")
    .update(data)
    .eq("id", data.id);

  if (error) throw error;
}