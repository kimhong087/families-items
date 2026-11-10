import { LotusSpray } from "./Lotus";

// Heading block for dashboard-style pages (My Entries, Pending Entries).
export default function PageIntro({ title, children }) {
  return (
    <div className="container page-intro">
      <LotusSpray className="deco-corner" />
      <p className="kicker">Khmer Living Archive</p>
      <h1>{title}</h1>
      <p className="lead">{children}</p>
    </div>
  );
}
