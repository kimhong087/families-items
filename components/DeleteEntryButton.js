"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

// Owner-only delete control for the entry detail page. The detail page only
// renders it for the owner, the delete query is additionally filtered by the
// signed-in user's id, and Supabase RLS remains the real enforcement.
export default function DeleteEntryButton({ entryId }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const confirmButtonRef = useRef(null);

  // Move keyboard focus to the confirm button so the two-step flow is
  // reachable without hunting for it.
  useEffect(() => {
    if (confirming && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [confirming]);

  async function handleDelete() {
    if (deleting) return;
    setDeleting(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        setMessage("Your session has expired. Please log in again.");
        return;
      }

      const { data, error } = await supabase
        .from("entries")
        .delete()
        .eq("id", entryId)
        .eq("owner", authData.user.id)
        .select();

      // .select() returns the deleted rows. An empty result means nothing was
      // deleted (e.g. RLS or the owner filter blocked it).
      if (error || !data || data.length === 0) {
        console.error("Entry delete failed:", error ?? data);
        setMessage("That change wasn't saved");
        return;
      }

      router.push("/");
    } catch (err) {
      console.error("Entry delete failed:", err);
      setMessage("That change wasn't saved");
    } finally {
      setDeleting(false);
    }
  }

  return !confirming ? (
    <button type="button" className="btn btn-danger-outline" onClick={() => setConfirming(true)}>
      Delete
    </button>
  ) : (
    <div className="delete-confirm">
      <span className="delete-confirm-text" role="alert">
        Delete this entry? This cannot be undone.
      </span>
      <button
        type="button"
        ref={confirmButtonRef}
        className="btn btn-danger"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Yes, delete it"}
      </button>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => {
          setConfirming(false);
          setMessage("");
        }}
        disabled={deleting}
      >
        Cancel
      </button>
      {message && (
        <p role="alert" className="delete-confirm-message">
          {message}
        </p>
      )}
    </div>
  );
}
