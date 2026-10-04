import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";

// Minimal entry detail page. It is the redirect target after a successful
// contribution: the form navigates to /entries/{newly-inserted-id}, and this
// page loads that single row by id.
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F5F0E6",
  },
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  back: { display: "inline-block", marginBottom: 24, fontSize: 14, color: "#A8792C", textDecoration: "none" },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 34,
    fontWeight: 700,
    color: "#171411",
    margin: "0 0 6px",
    lineHeight: 1.2,
  },
  khmerName: { fontSize: 16, color: "#A8792C", margin: "0 0 20px", fontWeight: 500 },
  photo: { display: "block", width: "100%", maxHeight: 420, objectFit: "contain", borderRadius: 12, backgroundColor: "#F3EBDB", border: "1px solid #DDD3C3" },
  description: { fontSize: 16, lineHeight: 1.7, color: "#4A433B", margin: "20px 0", whiteSpace: "pre-wrap" },
  meta: {
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    columnGap: 12,
    rowGap: 6,
    borderTop: "1px solid #DDD3C3",
    paddingTop: 16,
  },
  label: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#A8792C", margin: 0, fontWeight: 700 },
  value: { fontSize: 15, color: "#4A433B", margin: 0 },
};

export default async function EntryPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: entry, error } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !entry) {
    notFound();
  }

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <a href="/" style={styles.back}>
          ← Back to the archive
        </a>
        <h1 style={styles.title}>{entry.title}</h1>
        <p style={styles.khmerName}>{entry.khmer_name}</p>
        {entry.photo_url && (
          <img src={entry.photo_url} alt={entry.title} style={styles.photo} />
        )}
        <p style={styles.description}>{entry.description}</p>
        <div style={styles.meta}>
          <p style={styles.label}>Contributed by</p>
          <p style={styles.value}>{entry.contributor}</p>
          <p style={styles.label}>From</p>
          <p style={styles.value}>{entry.place}</p>
        </div>
      </div>
    </main>
  );
}