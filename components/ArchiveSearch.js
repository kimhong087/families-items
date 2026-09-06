"use client";

import { useState } from "react";
import EntryCard from "./EntryCard";

const styles = {
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 16px",
    fontSize: 15,
    color: "#171411",
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
    marginTop: 24,
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
      <input
        type="search"
        aria-label="Search the archive"
        placeholder="Search by title, Khmer name, or story"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        style={styles.input}
      />
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