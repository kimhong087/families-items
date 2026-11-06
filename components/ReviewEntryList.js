"use client";

import { useState } from "react";
import ReviewEntryCard from "./ReviewEntryCard";

const styles = {
  emptyCard: {
    marginTop: 24,
    padding: "32px 28px",
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#171411",
    margin: "0 0 8px",
  },
  emptyMessage: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4A433B",
    margin: "0 0 16px",
  },
  errorCard: {
    marginTop: 24,
    padding: "32px 28px",
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
    textAlign: "center",
    borderLeft: "4px solid #dc2626",
  },
  errorMessage: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4A433B",
    margin: "0 0 16px",
  },
};

export default function ReviewEntryList({ initialEntries }) {
  const [entries, setEntries] = useState(initialEntries);
  const [error, setError] = useState(null);

  const handleEntryRemoved = (entryId) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
    setError(null);
  };

  const handleReviewError = (message) => {
    setError(message);
  };

  if (entries.length === 0) {
    return (
      <div style={styles.emptyCard}>
        <p style={styles.emptyTitle}>No pending entries</p>
        <p style={styles.emptyMessage}>
          You're all caught up!
        </p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div style={styles.errorCard}>
          <p style={styles.errorMessage}>{error}</p>
        </div>
      )}
      {entries.map((entry) => (
        <ReviewEntryCard
          key={entry.id}
          id={entry.id}
          title={entry.title}
          khmerName={entry.khmer_name}
          description={entry.description}
          photoUrl={entry.photo_url}
          place={entry.place}
          createdAt={entry.created_at}
          onEntryRemoved={handleEntryRemoved}
          onError={handleReviewError}
        />
      ))}
    </>
  );
}