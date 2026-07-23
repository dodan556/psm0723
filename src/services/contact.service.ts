import { supabase } from "../lib/supabase";
import type { Contact } from "../types/contact";

export async function getContact() {
  const { data, error } = await supabase
    .from("contact")
    .select("*")
    .single();

  if (error) throw error;

  return data as Contact;
}

export async function updateContact(
  values: Partial<Contact>
) {
  const current = await getContact();

  const { error } = await supabase
    .from("contact")
    .update({
      ...values,
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id);

  if (error) throw error;
}