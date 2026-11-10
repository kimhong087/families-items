"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { reviewEntry } from "../lib/reviewEntry";
import EmptyState from "./EmptyState";
import ReviewCard from "./ReviewCard";
import "./dashboard.css";

// Pending entries (already fetched oldest-first by the reviewer-only page).
// An entry leaves the queue only after review_entry returns true. Errors stay
// on screen and the entry stays in the queue.
export default function ReviewQueue({ initialEntries, loadError }) {
  const [entries, setEntries] = useState(initialEntries);
  const [busy, setBusy] = useState({}); // id -> "published" | "returned"
  const [leaving, setLeaving] = useState({});
  const [message, setMessage] = useState(null); // { type, text }

  async function handleDecision(entry, status) {
    if (busy[entry.id]) return;
    setMessage(null);
    setBusy((prev) => ({ ...prev, [entry.id]: status }));

    const result = await reviewEntry(createClient(), entry.id, status);

    setBusy((prev) => {
      const next = { ...prev };
      delete next[entry.id];
      return next;
    });

    if (!result.ok) {
      setMessage({ type: "error", text: `“${entry.title}”: ${result.message}` });
      return;
    }
    setMessage({ type: "success", text: `“${entry.title}” was ${status === "published" ? "published" : "returned to its contributor"}.` });
    setLeaving((prev) => ({ ...prev, [entry.id]: true }));
    setTimeout(() => setEntries((prev) => prev.filter((e) => e.id !== entry.id)), 250);
  }

  return (
    <>
      {loadError && (
        <p role="alert" className="notice notice-error queue-note">
          We couldn&apos;t load the pending entries. Please refresh the page to try again.
        </p>
      )}
      <div className="queue-banner">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3h12M6 21h12M7 3c0 5 5 5 5 9s-5 4-5 9M17 3c0 5-5 5-5 9s5 4 5 9" />
        </svg>
        <div>
          <strong>
            {entries.length} {entries.length === 1 ? "entry" : "entries"} waiting for review
          </strong>
          <span>Oldest submissions appear first.</span>
        </div>
      </div>
      <div aria-live="polite">
        {message && (
          <p role={message.type === "error" ? "alert" : "status"} className={`notice notice-${message.type} queue-note`}>
            {message.text}
          </p>
        )}
      </div>
      {entries.length === 0 && !loadError ? (
        <EmptyState title="The queue is clear">
          Every contribution has been reviewed. New submissions will appear here as they arrive.
        </EmptyState>
      ) : (
        <div className="dash-list">
          {entries.map((entry) => (
            <ReviewCard key={entry.id} entry={entry} busy={busy[entry.id]} leaving={Boolean(leaving[entry.id])} onDecision={handleDecision} />
          ))}
        </div>
      )}
    </>
  );
}
