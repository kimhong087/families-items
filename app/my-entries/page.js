import collection from "../../collection.config.js";
import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#F5F0E6" },
  wrap: { maxWidth: 720, margin: "0 auto", padding: "64px 24px 80px" },
  authRow: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, margin: "0 0 44px" },
  authEmail: { fontSize: 14, color: "#4A433B", maxWidth: 200 },
  authSeparator: { fontSize: 14, color: "#4A433B" },
  authLink: { fontSize: 14, color: "#A8792C", fontWeight: 600 },
  kicker: { fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#A8792C", margin: 0, fontWeight: 700 },
  title: { fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 38, fontWeight: 700, color: "#171411", margin: "14px 0 12px", lineHeight: 1.15 },
  description: { fontSize: 17, lineHeight: 1.65, color: "#4A433B", margin: "0 0 32px" },
  emptyCard: { marginTop: 24, padding: "32px 28px", backgroundColor: "#FFFCF7", border: "1px solid #DDD3C3", borderRadius: 12, textAlign: "center" },
  emptyTitle: { fontSize: 18, fontWeight: 600, color: "#171411", margin: "0 0 8px" },
  emptyMessage: { fontSize: 15, lineHeight: 1.6, color: "#4A433B", margin: "0 0 16px" },
  contributeLink: { display: "inline-flex", padding: "10px 16px", fontSize: 14, fontWeight: 700, color: "#FFFCF7", backgroundColor: "#A8792C", borderRadius: 10, textDecoration: "none" },
  entryCard: { marginBottom: 16, padding: "20px 24px", backgroundColor: "#FFFCF7", border: "1px solid #DDD3C3", borderRadius: 12 },
  entryTitle: { fontSize: 18, fontWeight: 600, color: "#171411", margin: "0 0 8px" },
  statusText: { fontSize: 14, color: "#4A433B", margin: "0 0 12px" },
  editLink: { display: "inline-flex", padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#FFFCF7", backgroundColor: "#A8792C", borderRadius: 8, textDecoration: "none" },
  backLink: { display: "inline-block", marginTop: 40, fontSize: 14, color: "#A8792C", textDecoration: "none" },
};

function getStatusDisplay(status) {
  switch (status) {
    case "pending": return "Waiting for review";
    case "published": return "Published";
    case "returned": return "Returned for changes";
    default: return status;
  }
}

export default async function MyEntriesPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) redirect("/login");

  const { data: entries, error } = await supabase
    .from("entries")
    .select("id, title, status, created_at")
    .eq("owner", user.id)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching user entries:", error);
  const userEntries = entries || [];

  return (
    <main style={styles.page}>
      <style>{`
        .my-entries-contribute-link:hover { background-color: #8a5a23; }
        .my-entries-edit-link:hover { background-color: #8a5a23; }
      `}</style>
      <div style={styles.wrap}>
        <div style={styles.authRow}>
          <span style={styles.authEmail}>{user.email}</span>
          <span style={styles.authSeparator}>·</span>
          <a href="/" style={styles.authLink}>Browse archive</a>
          <span style={styles.authSeparator}>·</span>
          <a href="/logout/actions" style={styles.authLink}>Log out</a>
        </div>

        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>My Entries</h1>
        <p style={styles.description}>Track the status of your contributions to {collection.name}.</p>

        {userEntries.length === 0 ? (
          <div style={styles.emptyCard}>
            <p style={styles.emptyTitle}>No entries yet</p>
            <p style={styles.emptyMessage}>
              You haven't contributed any entries yet. Start by sharing an object that matters to your Khmer family.
            </p>
            <Link href="/contribute" className="my-entries-contribute-link" style={styles.contributeLink}>
              Contribute your first entry
            </Link>
          </div>
        ) : (
          <div>
            {userEntries.map((entry) => (
              <article key={entry.id} style={styles.entryCard}>
                <h2 style={styles.entryTitle}>{entry.title}</h2>
                <p style={styles.statusText}>{getStatusDisplay(entry.status)}</p>
                <Link href={`/entries/${entry.id}/edit`} className="my-entries-edit-link" style={styles.editLink}>
                  Edit entry
                </Link>
              </article>
            ))}
          </div>
        )}

        <a href="/" style={styles.backLink}>← Back to the archive</a>
      </div>
    </main>
  );
}