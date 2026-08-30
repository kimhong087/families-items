"use client";

import { useState } from "react";

const styles = {
  card: { backgroundColor: "#FFFCF7", border: "2px solid #DDD3C3", borderRadius: 12, boxShadow: "0 2px 8px rgba(23, 20, 17, 0.06)", padding: 20, marginTop: 24 },
  row: { display: "flex", flexWrap: "wrap", gap: 20 },
  photoBox: { flex: "1 1 38%",  minWidth: 220,
  backgroundColor: "#F5F0E6",
  borderRadius: 10,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", border: "1px solid #DDD3C3" },
  photo: { display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "contain", borderRadius: 10 },
  fallback: { width: "100%", aspectRatio: "4 / 3", borderRadius: 10, backgroundColor: "#F5F0E6", display: "flex", alignItems: "center", justifyContent: "center", color: "#A8792C", fontSize: 13, letterSpacing: 1 },
  info: { flex: "1 1 55%", minWidth: 260 },
  title: { fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 21, fontWeight: 700, color: "#171411", lineHeight: 1.25, margin: "0 0 2px" },
  khmerName: { fontSize: 15, color: "#A8792C", margin: "0 0 12px", fontWeight: 500 },
  description: { fontSize: 15, lineHeight: 1.65, color: "#4A433B", margin: "0 0 16px" },
  meta: { display: "grid", gridTemplateColumns: "112px 1fr", columnGap: 12, rowGap: 4, borderTop: "1px solid #DDD3C3", paddingTop: 14 },
  label: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#A8792C", margin: 0, fontWeight: 700},
  value: { fontSize: 14, color: "#4A433B", margin: 0,},
};

export default function EntryCard({ title, khmerName, description, contributor, place, image, date }) {
  const [broken, setBroken] = useState(false);
  return (
    <article style={styles.card}>
      <div style={styles.row}>
        <div style={styles.photoBox}>
          {image && !broken ? (
            <img src={image} alt={title} style={styles.photo} onError={() => setBroken(true)} />
          ) : (
            <div style={styles.fallback}>photo coming soon</div>
          )}
        </div>
        <div style={styles.info}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.khmerName}>{khmerName}</p>
          <p style={styles.description}>{description}</p>
          <div style={styles.meta}>
            <p style={styles.label}>Contributed by</p>
            <p style={styles.value}>{contributor}</p>
            <p style={styles.label}>From</p>
            <p style={styles.value}>{place}</p>
            {date && (
              <>
                <p style={styles.label}>Collected</p>
                <p style={styles.value}>{date}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}