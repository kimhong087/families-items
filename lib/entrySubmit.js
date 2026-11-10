import { createClient } from "./supabase/client";
import { uploadPhoto } from "./photo";

// Saves the contribute / edit form to Supabase. This is the logic that used to
// live inside ContributeForm.handleSubmit, moved here unchanged so the form
// component can stay small. Returns { ok: true, mode, id } or
// { ok: false, message }. The new-entry insert does not set `status`, so it
// keeps whatever default the database gives it (the pending review workflow).
export async function submitEntry({ mode, entryId, initial, fields, photo }) {
  const supabase = createClient();
  const hasCurrentPhoto = Boolean(initial && initial.photo_url);

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      return { ok: false, message: "Your session has expired. Please log in again." };
    }
    const user = authData.user;

    // Trim every text field before saving.
    const title = fields.title.trim();
    const khmer_name = fields.khmer_name.trim();
    const description = fields.description.trim();
    const contributor = fields.contributor.trim();
    const place = fields.place.trim();

    if (mode === "edit") {
      // Keep the current photo unless the user picked a replacement.
      let photo_url = hasCurrentPhoto ? initial.photo_url : "";
      let uploadedPath = null;

      if (photo) {
        const uploaded = await uploadPhoto(supabase, user.id, photo);
        if (!uploaded) {
          return { ok: false, message: "We could not upload your photo. Please try again." };
        }
        uploadedPath = uploaded.path;
        photo_url = uploaded.url;
      }

      // Check if the user is a reviewer
      const { data: isReviewerData, error: reviewerError } = await supabase.rpc("is_reviewer");
      const isReviewer = !reviewerError && isReviewerData === true;

      const updateData = { title, khmer_name, description, place, photo_url, contributor };

      // If user is not a reviewer, set status to 'pending'.
      // If user is a reviewer, the status is preserved (not included in update).
      if (!isReviewer) {
        updateData.status = "pending";
      }

      // Only the allowed columns are updated; id, created_at, and owner are
      // never touched. The owner filter keeps the change scoped to the
      // signed-in user's own row — RLS remains the real enforcement.
      const { data: updated, error: updateError } = await supabase
        .from("entries")
        .update(updateData)
        .eq("id", entryId)
        .eq("owner", user.id)
        .select();

      if (updateError || !updated || updated.length === 0) {
        console.error("Entry update failed:", updateError ?? updated);
        if (uploadedPath) {
          try {
            await supabase.storage.from("photos").remove([uploadedPath]);
          } catch (cleanupError) {
            console.error("Orphaned photo cleanup failed:", cleanupError);
          }
        }
        return { ok: false, message: "That change wasn't saved" };
      }

      return { ok: true, mode: "edit", id: entryId };
    }

    // Create mode: the photo is required here, so it is always set.
    const uploaded = await uploadPhoto(supabase, user.id, photo);
    if (!uploaded) {
      return { ok: false, message: "We could not upload your photo. Please try again." };
    }

    const { data: inserted, error: insertError } = await supabase
      .from("entries")
      .insert({ owner: user.id, title, khmer_name, description, place, photo_url: uploaded.url, contributor })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("Entry insert failed:", insertError);
      try {
        await supabase.storage.from("photos").remove([uploaded.path]);
      } catch (cleanupError) {
        console.error("Orphaned photo cleanup failed:", cleanupError);
      }
      return { ok: false, message: "We could not save your entry. Please try again." };
    }

    return { ok: true, mode: "create", id: inserted.id };
  } catch (err) {
    console.error("Entry form submit failed:", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
