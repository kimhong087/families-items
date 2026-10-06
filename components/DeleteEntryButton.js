"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

const styles = {
  button: {
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 700,
    color: "#9C4A23",
    backgroundColor: "#F9E9DF",
    border: "1px solid #E5C4A8",
    borderRadius: 10,
    cursor: "pointer",
  },
  confirmButton: {
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFCF7",
    backgroundColor: "#9C4A23",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 700,
    color: "#4A433B",
    backgroundColor: "transparent",
    border: "1px solid #DDD3C3",
    borderRadius: 10,
    cursor: "pointer",
  },
  disabled: { opacity: 0.7, cursor: "not-allowed" },
  confirmWrap: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 },
  confirmText: { fontSize: 14, fontWeight: 700, color: "#9C4A23" },
  message: { width: "100%", margin: 0, fontSize: 14, color: "#9C4A23" },
};

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

  return (
    <>
      <style>{`
        .delete-entry-btn { transition: background-color 0.15s ease; }
        .delete-entry-btn:hover:not(:disabled) { background-color: #F3DCC8; }
        .delete-confirm-btn { transition: background-color 0.15s ease; }
        .delete-confirm-btn:hover:not(:disabled) { background-color: #7E3A1B; }
        .delete-cancel-btn { transition: background-color 0.15s ease; }
        .delete-cancel-btn:hover:not(:disabled) { background-color: #F3EBDB; }
        .delete-entry-btn:focus-visible,
        .delete-confirm-btn:focus-visible,
        .delete-cancel-btn:focus-visible {
          outline: 3px solid rgba(156, 74, 35, 0.35);
          outline-offset: 2px;
        }
      `}</style>
      {!confirming ? (
        <button
          type="button"
          className="delete-entry-btn"
          style={styles.button}
          onClick={() => setConfirming(true)}
        >
          Delete
        </button>
      ) : (
        <div style={styles.confirmWrap}>
          <span style={styles.confirmText} role="alert">
            Delete this entry? This cannot be undone.
          </span>
          <button
            type="button"
            ref={confirmButtonRef}
            className="delete-confirm-btn"
            style={deleting ? { ...styles.confirmButton, ...styles.disabled } : styles.confirmButton}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Yes, delete it"}
          </button>
          <button
            type="button"
            className="delete-cancel-btn"
            style={deleting ? { ...styles.cancelButton, ...styles.disabled } : styles.cancelButton}
            onClick={() => {
              setConfirming(false);
              setMessage("");
            }}
            disabled={deleting}
          >
            Cancel
          </button>
          {message && (
            <p role="alert" style={styles.message}>
              {message}
            </p>
          )}
        </div>
      )}
    </>
  );
}