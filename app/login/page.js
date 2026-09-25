import { login } from "./actions";
import SubmitButton from "../../components/SubmitButton";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F5F0E6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(23, 20, 17, 0.06)",
    padding: "32px 28px",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#A8792C",
    margin: 0,
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 28,
    fontWeight: 700,
    color: "#171411",
    margin: "12px 0 20px",
  },
  label: {
    display: "block",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#A8792C",
    margin: "0 0 6px",
  },
  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 14px",
    fontSize: 15,
    color: "#171411",
    backgroundColor: "#F3EBDB",
    border: "2px solid #C3B18E",
    borderRadius: 10,
  },
  field: { margin: "0 0 18px" },
  error: {
    margin: "0 0 16px",
    padding: "10px 12px",
    backgroundColor: "#F9E9DF",
    border: "1px solid #E5C4A8",
    borderRadius: 8,
    fontSize: 14,
    color: "#9C4A23",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "12px",
    fontSize: 15,
    fontWeight: 700,
    color: "#FFFCF7",
    border: "none",
    borderRadius: 10,
  },
  hint: { fontSize: 14, color: "#4A433B", textAlign: "center", margin: "16px 0 0" },
  link: { color: "#A8792C", fontWeight: 600 },
  back: { marginTop: 24, fontSize: 14, color: "#A8792C", textDecoration: "none" },
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const failed = params.error !== undefined;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>Log in</h1>

        <form action={login}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              style={styles.input}
            />
          </div>

          {failed && (
            <p role="alert" style={styles.error}>
              Invalid email or password
            </p>
          )}

          <SubmitButton style={styles.button} pendingText="Logging in...">
            Log in
          </SubmitButton>

          <p style={styles.hint}>
            New to the archive?{" "}
            <a href="/signup" style={styles.link}>
              Create an account
            </a>
          </p>
        </form>
      </div>

      <a href="/" style={styles.back}>
        ← Back to the archive
      </a>
    </main>
  );
}