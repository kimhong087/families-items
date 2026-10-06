import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteEntryButton from "../../../components/DeleteEntryButton";
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
  actions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
    marginTop: 28,
  },
  editButton: {
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFCF7",
    backgroundColor: "#A8792C",
    border: "none",
    borderRadius: 10,
    textDecoration: "none",
    cursor: "pointer",
  },
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

  // Owner-only tools: compare the signed-in user's id with the row's owner
  // column. Hiding the buttons is only a UI convenience — RLS is what
  // actually stops other users from changing or deleting this row.
  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  const isOwner = Boolean(user && user.id === entry.owner);

  return (
    <main style={styles.page}>
      <style>{`
        .entry-action-link { transition: background-color 0.15s ease; }
        .entry-action-link:hover { background-color: #8a5a23; }
        .entry-action-link:focus-visible {
          outline: 3px solid rgba(168, 121, 44, 0.4);
          outline-offset: 2px;
        }
      `}</style>
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

        {isOwner && (
          <div style={styles.actions}>
            <Link
              href={`/entries/${entry.id}/edit`}
              className="entry-action-link"
              style={styles.editButton}
            >
              Edit
            </Link>
            <DeleteEntryButton entryId={entry.id} />
          </div>
        )}
      </div>
    </main>
  );
}