import { supabase } from "../lib/supabase";
import { uploadMedia } from "./storage.service";

export interface ProjectMedia {
  id: string;
  project_id: string;
  image_url: string;
  sort_order: number;
}
export async function getProjectMedia(projectId: string) {
  const { data, error } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data as ProjectMedia[];
}

export async function deleteProjectMedia(id: string) {
  const { error } = await supabase
    .from("project_images")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


export async function uploadProjectMedia(
  projectId: string,
  file: File,
  sortOrder: number
) {
  const mediaUrl = await uploadMedia(file, "details");

  const { data, error } = await supabase
    .from("project_images")
    .insert({
      project_id: projectId,
      image_url: mediaUrl,
      sort_order: sortOrder,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}