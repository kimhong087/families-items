export const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB

// The storage extension is derived from the validated MIME type, never from
// the original filename.
const PHOTO_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// `required` is false in edit mode, where keeping the existing photo is fine.
export function validatePhoto(file, required) {
  if (!file) return required ? "A photo is required." : "";
  if (!ALLOWED_PHOTO_TYPES.has(file.type)) return "Photo must be JPG, PNG, or WebP.";
  if (file.size > MAX_PHOTO_BYTES) return "Photo must be 5 MB or smaller.";
  return "";
}

// Uploads one photo to the "photos" bucket at <user-id>/<random-uuid>.<ext>
// (the original filename is never used) and returns { path, url }, or null
// when the upload fails.
export async function uploadPhoto(supabase, userId, file) {
  const extension = PHOTO_EXTENSIONS[file.type] || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("photos").upload(path, file);
  if (error) {
    console.error("Photo upload failed:", error);
    return null;
  }

  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return { path, url: data.publicUrl };
}
