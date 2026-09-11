"use client";

import { useState } from "react";
import EntryCard from "./EntryCard";

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

// Client-side search over title, Khmer name, and story.
// Empty query shows everything; no matches shows the empty state.
export default function ArchiveSearch({ entries }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const results = search
    ? entries.filter((entry) =>
        [entry.title, entry.khmerName, entry.description].some(
          (field) => field.toLowerCase().includes(search)
        )
      )
    : entries;
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
      {results.map((entry) => (
        <EntryCard
          key={entry.title}
          title={entry.title}
          khmerName={entry.khmerName}
          description={entry.description}
          contributor={entry.contributor}
          place={entry.place}
          image={entry.image}
          date={entry.date}
        />
      ))}
      {results.length === 0 && <p style={styles.empty}>No entries found.</p>}
    </>
  );
}