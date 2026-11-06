"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";

const styles = {
  card: {
    backgroundColor: "#FFFCF7",
    border: "2px solid #DDD3C3",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(23, 20, 17, 0.06)",
    padding: 20,
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
  },
  photoBox: {
    flex: "1 1 38%",
    minWidth: 220,
    backgroundColor: "#F5F0E6",
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #DDD3C3",
  },
  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "4 / 3",
    objectFit: "contain",
    borderRadius: 10,
  },
  fallback: {
    width: "100%",
    aspectRatio: "4 / 3",
    borderRadius: 10,
    backgroundColor: "#F5F0E6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#A8792C",
    fontSize: 13,
    letterSpacing: 1,
  },
  info: {
    flex: "1 1 55%",
    minWidth: 260,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 21,
    fontWeight: 700,
    color: "#171411",
    lineHeight: 1.25,
    margin: "0 0 2px",
  },
  khmerName: {
    fontSize: 15,
    color: "#A8792C",
    margin: "0 0 12px",
    fontWeight: 500,
  },
  description: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "#4A433B",
    margin: "0 0 16px",
    overflowWrap: "anywhere",
  },
  meta: {
    display: "grid",
    gridTemplateColumns: "112px 1fr",
    columnGap: 12,
    rowGap: 4,
    borderTop: "1px solid #DDD3C3",
    paddingTop: 14,
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#A8792C",
    margin: 0,
    fontWeight: 700,
  },
  value: {
    fontSize: 14,
    color: "#4A433B",
    margin: 0,
  },
  buttonGroup: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  publishButton: {
    padding: "10px 20px",
    fontSize: 15,
    fontWeight: 700,
    color: "#FFFCF7",
    backgroundColor: "#059669",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    minWidth: 140,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  returnButton: {
    padding: "10px 20px",
    fontSize: 15,
    fontWeight: 700,
    color: "#FFFCF7",
    backgroundColor: "#dc2626",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    minWidth: 140,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonLoading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 12,
    padding: "12px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    fontSize: 14,
    color: "#dc2626",
  },
};

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export default function ReviewEntryCard({
  id,
  title,
  khmerName,
  description,
  photoUrl,
  place,
  createdAt,
  onEntryRemoved,
  onError,
}) {
  const [broken, setBroken] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [actionError, setActionError] = useState(null);

  const handleReview = async (decision) => {
    // Reset error state
    setActionError(null);
    
    // Set loading state based on decision
    if (decision === "published") {
      setIsPublishing(true);
    } else {
      setIsReturning(true);
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc("review_entry", {
        entry_id: id,
        decision,
      });

      if (error) {
        throw error;
      }

      if (data === true) {
        // Success - remove entry from queue
        onEntryRemoved(id);
      } else {
        // RPC returned false
        setActionError(
          "Something went wrong. Your action could not be completed. Please try again."
        );
        onError(
          "Something went wrong. Your action could not be completed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error reviewing entry:", error);
      setActionError(
        "Something went wrong. Your action could not be completed. Please try again."
      );
      onError(
        "Something went wrong. Your action could not be completed. Please try again."
      );
    } finally {
      setIsPublishing(false);
      setIsReturning(false);
    }
  };

  const handlePublish = () => handleReview("published");
  const handleReturn = () => handleReview("returned");

  return (
    <article style={styles.card}>
      <div style={styles.row}>
        <div style={styles.photoBox}>
          {photoUrl && !broken ? (
            <img
              src={photoUrl}
              alt={title}
              style={styles.photo}
              onError={() => setBroken(true)}
            />
          ) : (
            <div style={styles.fallback}>photo coming soon</div>
          )}
        </div>
        <div style={styles.info}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.khmerName}>{khmerName}</p>
          <p style={styles.description}>{description}</p>
          
          <div style={styles.meta}>
            <p style={styles.label}>From</p>
            <p style={styles.value}>{place}</p>
            <p style={styles.label}>Submitted</p>
            <p style={styles.value}>{formatDate(createdAt)}</p>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={handlePublish}
              disabled={isPublishing || isReturning}
              className="review-publish-button"
              style={{
                ...styles.publishButton,
                ...(isPublishing || isReturning ? styles.buttonLoading : {}),
              }}
            >
              <span style={styles.buttonText}>
                Publish / ផ្សព្វផ្សាយ
              </span>
              {isPublishing && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </button>
            <button
              onClick={handleReturn}
              disabled={isPublishing || isReturning}
              className="review-return-button"
              style={{
                ...styles.returnButton,
                ...(isPublishing || isReturning ? styles.buttonLoading : {}),
              }}
            >
              <span style={styles.buttonText}>
                Return / ត្រឡប់ទៅកែសម្រួល
              </span>
              {isReturning && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </button>
          </div>

          {actionError && (
            <div style={styles.errorMessage}>
              {actionError}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}