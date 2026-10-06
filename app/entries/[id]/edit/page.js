import { notFound } from "next/navigation";
import ContributeForm from "../../../../components/ContributeForm";
import { createClient } from "../../../../lib/supabase/server";

// Edit page for one entry. Only the entry's owner can reach the form: this
// server component loads the row, compares the signed-in user with the row's
// owner column, and shows a message instead of the form otherwise. RLS is
// the real enforcement.
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F5F0E6",
  },
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "64px 24px 80px",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#A8792C",
    margin: 0,
    fontWeight: 700,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 38,
    fontWeight: 700,
    color: "#171411",
    margin: "14px 0 12px",
    lineHeight: 1.15,
  },
  description: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "#4A433B",
    margin: "0 0 24px",
  },
  card: {
    marginTop: 24,
    padding: "32px 28px",
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(23, 20, 17, 0.06)",
  },
  note: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4A433B",
    margin: "0 0 12px",
  },
  link: { color: "#A8792C", fontWeight: 600 },
  back: { display: "inline-block", marginTop: 32, fontSize: 14, color: "#A8792C", textDecoration: "none" },
};

export default async function EditEntryPage({ params }) {
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

  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  const isOwner = Boolean(user && user.id === entry.owner);

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>Edit Entry</h1>
        <p style={styles.description}>Editing: {entry.title}</p>

        {!user ? (
          <div style={styles.card}>
            <p style={styles.note}>You need to log in to edit an entry.</p>
            <a href="/login" style={styles.link}>
              Log in
            </a>
          </div>
        ) : !isOwner ? (
          <div style={styles.card}>
            <p style={styles.note}>You can only edit your own entries.</p>
            <a href={`/entries/${entry.id}`} style={styles.link}>
              Back to the entry
            </a>
          </div>
        ) : (
          <div style={styles.card}>
            <ContributeForm
              mode="edit"
              entryId={entry.id}
              initial={{
                title: entry.title,
                khmer_name: entry.khmer_name,
                description: entry.description,
                place: entry.place,
                contributor: entry.contributor,
                photo_url: entry.photo_url,
              }}
            />
          </div>
        )}

        <a href={`/entries/${entry.id}`} style={styles.back}>
          ← Back to the entry
        </a>
      </div>
    </main>
  );
}