import ContributeForm from "../../components/ContributeForm";
import { createClient } from "../../lib/supabase/server";

// Only logged-in users can reach the contribute form. This server component
// checks the session first: logged out visitors see a message and a link to
// the login page instead of the form. The form itself re-checks auth at
// submit time as a second line of defense.
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

export default async function ContributePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>Contribute an Item</h1>
        <p style={styles.description}>
          Share an object that matters to your Khmer family.
        </p>

        {user ? (
          <div style={styles.card}>
            <ContributeForm />
          </div>
        ) : (
          <div style={styles.card}>
            <p style={styles.note}>You need to log in to contribute an item.</p>
            <a href="/login" style={styles.link}>
              Log in
            </a>
          </div>
        )}

        <a href="/" style={styles.back}>
          ← Back to the archive
        </a>
      </div>
    </main>
  );
}