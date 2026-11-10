import Link from "next/link";
import { LotusMark, LotusSpray } from "./Lotus";
import "./auth.css";

// Split screen for /login and /signup: heritage artwork on one side, the form
// on the other. `active` is "login" or "signup" (highlights the tab).
export default function AuthShell({ active, title, subtitle, children }) {
  return (
    <main className="auth">
      <section className="auth-visual" aria-hidden="true">
        <h2>Keep our stories alive.</h2>
        <p className="khmer-line">រក្សារឿងរ៉ាវរបស់យើងឱ្យនៅរស់</p>
        <hr className="divider" />
        <p className="kicker">A community archive<br />for future generations</p>
      </section>
      <section className="auth-panel">
        <LotusSpray className="deco-corner" />
        <LotusSpray className="deco-corner bottom" />
        <div className="auth-box">
          <div className="auth-brand">
            <LotusMark size={48} />
            <span className="brand-name">Khmer Living Archive</span>
            <span className="brand-sub">បណ្ណសារគ្រួសារខ្មែរ</span>
          </div>
          <h1>{title}</h1>
          <p className="auth-sub">{subtitle}</p>
          <div className="auth-tabs">
            <Link href="/login" className="auth-tab" aria-current={active === "login" ? "page" : undefined}>Sign in</Link>
            <Link href="/signup" className="auth-tab" aria-current={active === "signup" ? "page" : undefined}>Create account</Link>
          </div>
          {children}
          <Link href="/" className="auth-back">← Back to the archive</Link>
        </div>
      </section>
    </main>
  );
}
