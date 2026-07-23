import { supabase } from "../lib/supabase";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
];

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

export async function uploadMedia(
  file: File,
  folder: "thumbnails" | "details" | "videos" | "settings"
) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("지원하지 않는 파일 형식입니다.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("파일 용량은 최대 200MB까지 가능합니다.");
  }

  const fileExt = file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("projects")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("projects")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * 기존 코드와의 호환성을 위해 남겨둠.
 * 기존 ImageUploader는 수정하지 않아도 계속 동작함.
 */
export async function uploadProjectImage(file: File) {
  return uploadMedia(file, "thumbnails");
}