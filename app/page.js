import collection from "../collection.config.js";
import ArchiveSearch from "../components/ArchiveSearch";
import { createClient } from "../lib/supabase/server";
import { logout } from "./logout/actions";

// Entries live in the Supabase "entries" table now. The cards and the search
// load them in the browser (components/ArchiveSearch.js); this page only asks
// Supabase for the total count. data/entries.js is kept for reference.

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
    fontWeight: 700
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 42,
    fontWeight: 700,
    color: "#171411",
    margin: "14px 0 12px",
    lineHeight: 1.15,
  },
  description: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "#4A433B",
    margin: 0,
  },
  card: {
    marginTop: 24,
    padding: "18px 20px",
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
  },
  cardLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#A8792C",
    margin: 0,
    fontWeight: 700
  },
  cardValue: {
    fontSize: 15,
    color: "#4A433B",
    margin: "4px 0 0",
  },
  count: {
    fontSize: 13,
    letterSpacing: 1,
    color: "#A8792C",
    marginTop: 40,
  },
  footer: {
    marginTop: 56,
    paddingTop: 20,
    borderTop: "1px solid #DDD3C3",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#4A433B",
  },
  authRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    margin: "0 0 44px",
  },
  authEmail: {
    fontSize: 14,
    color: "#4A433B",
    maxWidth: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  authSeparator: { fontSize: 14, color: "#4A433B" },
  authLink: { fontSize: 14, color: "#A8792C", fontWeight: 600 },
  logoutButton: {
    fontSize: 14,
    color: "#A8792C",
    fontWeight: 600,
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
};

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  // Total for the "entries in the archive" line. head: true asks Supabase
  // for the count only (no rows). If this query fails, count is null and
  // the line shows a dash instead of breaking the page.
  const { count } = await supabase
    .from("entries")
    .select("*", { count: "exact", head: true });

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.authRow}>
          {user ? (
            <>
              <span style={styles.authEmail}>{user.email}</span>
              <form action={logout}>
                <button type="submit" style={styles.logoutButton}>
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <a href="/login" style={styles.authLink}>
                Log in
              </a>
              <span style={styles.authSeparator}>·</span>
              <a href="/signup" style={styles.authLink}>
                Sign up
              </a>
            </>
          )}
        </div>

        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>{collection.name}</h1>
        <p style={styles.description}>{collection.description}</p>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Curated by</p>
          <p style={styles.cardValue}>{collection.curator}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardLabel}>Source</p>
          <p style={styles.cardValue}>{collection.source}</p>
        </div>

        <ArchiveSearch />

        <p style={styles.count}>entries in the archive: {count ?? "—"}</p>

        <footer style={styles.footer}>
          Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
          2026. This archive is under construction all semester. Come back in
          December.
        </footer>
      </div>
    </main>
  );
}
