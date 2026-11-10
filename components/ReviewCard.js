import { formatDate } from "../lib/formatDate";
import DashThumb from "./DashThumb";
import "./dashboard.css";

// One pending entry with Publish / Return. `busy` is "publishing", "returning"
// or null; both buttons lock while a decision is being saved.
export default function ReviewCard({ entry, busy, leaving, onDecision }) {
  return (
    <article className="dash-card" data-leaving={leaving}>
      <DashThumb src={entry.photo_url} alt={entry.title} />
      <div>
        <h2 className="dash-title">{entry.title}</h2>
        <p className="dash-khmer">{entry.khmer_name}</p>
        <p className="dash-desc">{entry.description}</p>
        <p className="dash-meta">
          {[entry.contributor && `By ${entry.contributor}`, entry.place].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="dash-side">
        <span className="dash-date">{formatDate(entry.created_at)}</span>
        <div className="dash-actions">
          <button type="button" className="btn btn-primary btn-sm" disabled={Boolean(busy)} onClick={() => onDecision(entry, "published")}>
            {busy === "published" ? "Publishing…" : "Publish"}
          </button>
          <button type="button" className="btn btn-danger-outline btn-sm" disabled={Boolean(busy)} onClick={() => onDecision(entry, "returned")}>
            {busy === "returned" ? "Returning…" : "Return"}
          </button>
        </div>
      </div>
    </article>
  );
}
