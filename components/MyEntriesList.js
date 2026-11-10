"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "../lib/formatDate";
import DashThumb from "./DashThumb";
import EmptyState from "./EmptyState";
import StatusBadge from "./StatusBadge";
import "./dashboard.css";

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "published", label: "Published" },
  { key: "returned", label: "Returned" },
];

// The signed-in user's own entries (the page already filtered by owner) with
// status tabs. Edit goes to the existing owner-only edit page; View opens the
// detail page, which allows the owner to see their own unpublished entries.
export default function MyEntriesList({ entries }) {
  const [tab, setTab] = useState("all");
  const count = (key) => (key === "all" ? entries.length : entries.filter((e) => e.status === key).length);
  const shown = tab === "all" ? entries : entries.filter((e) => e.status === tab);

  if (entries.length === 0) {
    return (
      <EmptyState
        title="No entries yet"
        action={<Link href="/contribute" className="btn btn-gold">Contribute your first entry</Link>}
      >
        You haven&apos;t contributed any entries yet. Start by sharing an object that matters to your Khmer family.
      </EmptyState>
    );
  }

  return (
    <>
      <div className="tabs" role="group" aria-label="Filter by status">
        {TABS.map((t) => (
          <button key={t.key} type="button" className="tab" aria-pressed={tab === t.key} onClick={() => setTab(t.key)}>
            {t.label} ({count(t.key)})
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <EmptyState title={`Nothing ${tab} right now`}>Entries with this status will appear here.</EmptyState>
      ) : (
        <div className="dash-list">
          {shown.map((entry) => (
            <article key={entry.id} className="dash-card">
              <DashThumb src={entry.photo_url} alt={entry.title} />
              <div>
                <h2 className="dash-title">{entry.title}</h2>
                <p className="dash-khmer">{entry.khmer_name}</p>
                <p className="dash-desc">{entry.description}</p>
              </div>
              <div className="dash-side">
                <StatusBadge status={entry.status} />
                <span className="dash-date">{formatDate(entry.created_at)}</span>
                <div className="dash-actions">
                  <Link href={`/entries/${entry.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
                  <Link href={`/entries/${entry.id}`} className="btn btn-primary btn-sm">View</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
