import collection from "../../collection.config.js";
import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import ReviewEntryList from "../../components/ReviewEntryList";

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
    margin: "0 0 32px",
  },
  permissionCard: {
    marginTop: 24,
    padding: "32px 28px",
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
    textAlign: "center",
  },
  permissionMessage: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4A433B",
    margin: "0 0 16px",
  },
  backLink: {
    display: "inline-block",
    marginTop: 40,
    fontSize: 14,
    color: "#A8792C",
    textDecoration: "none",
  },
};

export default async function ReviewPage() {
  const supabase = await createClient();
  
  // Check if user is logged in
  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  // Check if user is a reviewer
  const { data: reviewerData } = await supabase.rpc('is_reviewer');
  const isReviewer = reviewerData === true;

  // If user is not a reviewer, show permission message
  if (!isReviewer) {
    return (
      <main style={styles.page}>
        <div style={styles.wrap}>
          <div style={styles.authRow}>
            {user ? (
              <>
                <span style={styles.authEmail}>{user.email}</span>
                <span style={styles.authSeparator}>·</span>
                <a href="/my-entries" style={styles.authLink}>
                  My entries
                </a>
                <span style={styles.authSeparator}>·</span>
                <a href="/" style={styles.authLink}>
                  Browse archive
                </a>
                <span style={styles.authSeparator}>·</span>
                <form action="/logout/actions">
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
          <h1 style={styles.title}>Review Queue</h1>
          <p style={styles.description}>
            Review pending submissions for {collection.name}.
          </p>

          <div style={styles.permissionCard}>
            <p style={styles.permissionMessage}>
              You don't have permission to access this page.
            </p>
            <a href="/" style={styles.backLink}>
              ← Back to the archive
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Fetch pending entries for reviewers
  const { data: entries, error } = await supabase
    .from("entries")
    .select("id, title, khmer_name, description, photo_url, place, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching pending entries:", error);
  }

  const pendingEntries = entries || [];

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.authRow}>
          <span style={styles.authEmail}>{user.email}</span>
          <span style={styles.authSeparator}>·</span>
          <a href="/my-entries" style={styles.authLink}>
            My entries
          </a>
          <span style={styles.authSeparator}>·</span>
          <a href="/" style={styles.authLink}>
            Browse archive
          </a>
          <span style={styles.authSeparator}>·</span>
          <form action="/logout/actions">
            <button type="submit" style={styles.logoutButton}>
              Log out
            </button>
          </form>
        </div>

        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>Review Queue</h1>
        <p style={styles.description}>
          Review pending submissions for {collection.name}.
        </p>

        <style>{`
          .review-publish-button:hover { background-color: #047857; }
          .review-return-button:hover { background-color: #b91c1c; }
          .review-publish-button:focus-visible, .review-return-button:focus-visible {
            outline: 3px solid rgba(5, 150, 105, 0.4);
            outline-offset: 2px;
          }
        `}</style>

        <ReviewEntryList initialEntries={pendingEntries} />
        
        <a href="/" style={styles.backLink}>
          ← Back to the archive
        </a>
      </div>
    </main>
  );
}