"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { PLACES } from "../lib/places";
import { validateEntry } from "../lib/validateEntry";

const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB

// The storage extension is derived from the validated MIME type, never from
// the original filename.
const PHOTO_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const control = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px",
  fontSize: 15,
  color: "#171411",
  backgroundColor: "#F3EBDB",
  border: "2px solid #C3B18E",
  borderRadius: 10,
};

const styles = {
  label: {
    display: "block",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#A8792C",
    margin: "0 0 6px",
  },
  control,
  textarea: { ...control, minHeight: 140, resize: "vertical", fontFamily: "inherit" },
  field: { margin: "0 0 18px" },
  error: { margin: "6px 0 0", fontSize: 13, color: "#9C4A23" },
  hint: { margin: "6px 0 0", fontSize: 13, color: "#7E6E57" },
  button: {
    display: "block",
    width: "100%",
    padding: "12px",
    fontSize: 15,
    fontWeight: 700,
    color: "#FFFCF7",
    backgroundColor: "#8a5a23",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  submitError: {
    margin: "0 0 18px",
    padding: "10px 12px",
    backgroundColor: "#F9E9DF",
    border: "1px solid #E5C4A8",
    borderRadius: 8,
    fontSize: 14,
    color: "#9C4A23",
  },
};

function validatePhoto(file) {
  if (!file) return "A photo is required.";
  if (!ALLOWED_PHOTO_TYPES.has(file.type)) return "Photo must be JPG, PNG, or WebP.";
  if (file.size > MAX_PHOTO_BYTES) return "Photo must be 5 MB or smaller.";
  return "";
}

export default function ContributeForm() {
  const router = useRouter();
  const [fields, setFields] = useState({
    title: "",
    khmer_name: "",
    description: "",
    place: "",
    contributor: "",
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleTextChange(event) {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0] ?? null;
    setPhoto(file);
    setErrors((prev) => ({ ...prev, photo: validatePhoto(file) }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;

    const fieldErrors = validateEntry(fields);
    const photoError = validatePhoto(photo);
    const allErrors = photoError ? { ...fieldErrors, photo: photoError } : fieldErrors;

    if (Object.keys(allErrors).length > 0) {
      // Nothing is uploaded or saved until validation passes.
      setErrors(allErrors);
      setSubmitError("");
      return;
    }

    setErrors({});
    setSubmitError("");
    setSaving(true);

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        setSubmitError("Your session has expired. Please log in again.");
        return;
      }
      const user = authData.user;

      // Trim every text field before saving.
      const title = fields.title.trim();
      const khmer_name = fields.khmer_name.trim();
      const description = fields.description.trim();
      const contributor = fields.contributor.trim();
      const place = fields.place.trim();

      // Storage path is <user-id>/<random-uuid>.<extension>. The original
      // filename is never used.
      const extension = PHOTO_EXTENSIONS[photo.type] || "jpg";
      const path = `${user.id}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(path, photo);

      if (uploadError) {
        console.error("Photo upload failed:", uploadError);
        setSubmitError("We could not upload your photo. Please try again.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("photos")
        .getPublicUrl(path);
      const photo_url = publicUrlData.publicUrl;

      const { data: inserted, error: insertError } = await supabase
        .from("entries")
        .insert({
          owner: user.id,
          title,
          khmer_name,
          description,
          place,
          photo_url,
          contributor,
        })
        .select("id")
        .single();

      if (insertError || !inserted) {
        console.error("Entry insert failed:", insertError);
        try {
          await supabase.storage.from("photos").remove([path]);
        } catch (cleanupError) {
          console.error("Orphaned photo cleanup failed:", cleanupError);
        }
        setSubmitError("We could not save your entry. Please try again.");
        return;
      }

      router.push(`/entries/${inserted.id}`);
    } catch (err) {
      console.error("Contribute submit failed:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {submitError && (
        <p role="alert" style={styles.submitError}>
          {submitError}
        </p>
      )}

      <div style={styles.field}>
        <label htmlFor="title" style={styles.label}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={fields.title}
          onChange={handleTextChange}
          style={styles.control}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" style={styles.error}>
            {errors.title}
          </p>
        )}
      </div>

      <div style={styles.field}>
        <label htmlFor="khmer_name" style={styles.label}>
          Khmer name
        </label>
        <input
          id="khmer_name"
          name="khmer_name"
          type="text"
          value={fields.khmer_name}
          onChange={handleTextChange}
          style={styles.control}
          aria-invalid={Boolean(errors.khmer_name)}
          aria-describedby={errors.khmer_name ? "khmer-name-error" : undefined}
        />
        {errors.khmer_name && (
          <p id="khmer-name-error" style={styles.error}>
            {errors.khmer_name}
          </p>
        )}
      </div>

      <div style={styles.field}>
        <label htmlFor="description" style={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          value={fields.description}
          onChange={handleTextChange}
          style={styles.textarea}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        <p style={styles.hint}>At least 100 characters.</p>
        {errors.description && (
          <p id="description-error" style={styles.error}>
            {errors.description}
          </p>
        )}
      </div>

      <div style={styles.field}>
        <label htmlFor="place" style={styles.label}>
          Place
        </label>
        <select
          id="place"
          name="place"
          value={fields.place}
          onChange={handleTextChange}
          style={styles.control}
          aria-invalid={Boolean(errors.place)}
          aria-describedby={errors.place ? "place-error" : undefined}
        >
          <option value="">Select a place</option>
          {PLACES.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>
        {errors.place && (
          <p id="place-error" style={styles.error}>
            {errors.place}
          </p>
        )}
      </div>

      <div style={styles.field}>
        <label htmlFor="contributor" style={styles.label}>
          Contributor
        </label>
        <input
          id="contributor"
          name="contributor"
          type="text"
          value={fields.contributor}
          onChange={handleTextChange}
          style={styles.control}
          aria-invalid={Boolean(errors.contributor)}
          aria-describedby={errors.contributor ? "contributor-error" : undefined}
        />
        {errors.contributor && (
          <p id="contributor-error" style={styles.error}>
            {errors.contributor}
          </p>
        )}
      </div>

      <div style={styles.field}>
        <label htmlFor="photo" style={styles.label}>
          Photo
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoChange}
          style={styles.control}
          aria-invalid={Boolean(errors.photo)}
          aria-describedby={errors.photo ? "photo-error" : undefined}
        />
        <p style={styles.hint}>JPG, PNG, or WebP, up to 5 MB.</p>
        {errors.photo && (
          <p id="photo-error" style={styles.error}>
            {errors.photo}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        style={saving ? { ...styles.button, opacity: 0.7, cursor: "not-allowed" } : styles.button}
      >
        {saving ? "Saving..." : "Submit entry"}
      </button>
    </form>
  );
}