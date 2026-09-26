"use client";

import { useEffect, useState } from "react";
import EntryCard from "./EntryCard";
import { createClient } from "../lib/supabase/client";

const styles = {
  wrap: { position: "relative", marginTop: 32 },
  icon: { position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "16px 16px 16px 48px",
    fontSize: 16,
    color: "#171411",
    backgroundColor: "#F3EBDB",
    border: "2px solid #C3B18E",
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(23, 20, 17, 0.05)",
  },
  empty: {
    marginTop: 24,
    padding: 24,
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
    fontSize: 15,
    color: "#4A433B",
    textAlign: "center",
  },
};

// Entries load from the Supabase "entries" table in the browser via
// lib/supabase/client.js, newest first, then search filters them client-side
// over title, Khmer name, and story. While they load we show a short loading
// line; if the query fails or the table is empty we show a friendly message
// instead of a broken list. Empty query shows everything. A query that starts
// with a space matches nothing until that space is removed.
export default function ArchiveSearch() {
  const [entries, setEntries] = useState(null); // null = still loading
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;

    createClient()
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setLoadError(true);
          setEntries([]);
          return;
        }
        // Table columns are snake_case; map them to the prop names
        // EntryCard already uses (khmer_name -> khmerName, photo_url -> image).
        setEntries(
          (data ?? []).map((row) => ({
            id: row.id,
            title: row.title,
            khmerName: row.khmer_name,
            description: row.description,
            contributor: row.contributor,
            place: row.place,
            image: row.photo_url,
          }))
        );
      });

    return () => {
      active = false;
    };
  }, []);

  const loading = entries === null;
  const leadingSpace = /^\s/.test(query);
  const search = query.trim().toLowerCase();
  const results =
    loading || loadError
      ? []
      : query === ""
        ? entries
        : leadingSpace
          ? []
          : entries.filter((entry) =>
              [entry.title, entry.khmerName, entry.description].some(
                (field) => field.toLowerCase().includes(search)
              )
            );
  return (
    <>
      {/* ::placeholder and :focus need real CSS (inline styles can't reach
          pseudo-elements). Scoped to this input's class only. The !important
          beats the inline border color so focus can turn the border gold. */}
      <style>{`
        .archive-search-input::placeholder { color: #7E6E57; opacity: 1; }
        .archive-search-input:focus {
          outline: 3px solid rgba(168, 121, 44, 0.28);
          outline-offset: 1px;
          border-color: #A8792C !important;
        }
      `}</style>
      <div style={styles.wrap}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A8792C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={styles.icon}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          className="archive-search-input"
          type="search"
          aria-label="Search the archive"
          placeholder="Search by title, Khmer name, or story."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={styles.input}
        />
      </div>
      {loading && <p style={styles.empty}>Loading entries...</p>}
      {loadError && (
        <p style={styles.empty}>
          Could not load entries. Refresh the page to try again.
        </p>
      )}
      {!loading && !loadError && entries.length === 0 && (
        <p style={styles.empty}>No entries in the archive yet.</p>
      )}
      {!loading &&
        !loadError &&
        results.map((entry) => (
          <EntryCard
            key={entry.id}
            title={entry.title}
            khmerName={entry.khmerName}
            description={entry.description}
            contributor={entry.contributor}
            place={entry.place}
            image={entry.image}
          />
        ))}
      {!loading &&
        !loadError &&
        entries.length > 0 &&
        results.length === 0 &&
        query !== "" && (
          <p style={styles.empty}>No objects match your search.</p>
        )}
    </>
  );
}