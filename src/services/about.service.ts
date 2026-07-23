import { supabase } from "../lib/supabase";
import type { About } from "../types/about";

export async function getAbout() {
  const { data, error } = await supabase
    .from("about")
    .select("*")
    .single();

  if (error) throw error;

  return data as About;
}

export async function updateAbout(values: Partial<About>) {
  const current = await getAbout();

  const { error } = await supabase
    .from("about")
    .update({
      ...values,
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id);

  if (error) throw error;
}