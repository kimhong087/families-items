import Link from "next/link";
import { LotusSpray } from "./Lotus";
import PageShell from "./PageShell";
import "./form.css";

// Frame shared by /contribute and /entries/[id]/edit: illustrated side panel
// on the left, heading + form on the right.
export default function FormPage({ title, lead, backHref, backLabel, children }) {
  return (
    <PageShell>
      <div className="container">
        <div className="form-layout">
          <div className="form-side">
            <p>Every object carries a story worth keeping.</p>
          </div>
          <div className="form-main">
            <LotusSpray className="deco-corner" />
            <p className="kicker">Khmer Living Archive</p>
            <h1>{title}</h1>
            <p className="lead">{lead}</p>
            {children}
          </div>
        </div>
        <Link href={backHref} className="back-link" style={{ marginTop: 24 }}>← {backLabel}</Link>
      </div>
    </PageShell>
  );
}
