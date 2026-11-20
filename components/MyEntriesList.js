"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "../lib/formatDate";
import DashThumb from "./DashThumb";
import EmptyState from "./EmptyState";
import StatusBadge from "./StatusBadge";
import { useLanguage } from "../lib/language-context";
import "./dashboard.css";

// The signed-in user's own entries (the page already filtered by owner) with
// status tabs. Edit goes to the existing owner-only edit page; View opens the
// detail page, which allows the owner to see their own unpublished entries.
export default function MyEntriesList({ entries }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState("all");
  const count = (key) => (key === "all" ? entries.length : entries.filter((e) => e.status === key).length);
  const shown = tab === "all" ? entries : entries.filter((e) => e.status === tab);

  // Get tab labels from translations
  const TABS = [
    { key: "all", label: t("common.all") },
    { key: "pending", label: t("status.pending") },
    { key: "published", label: t("status.published") },
    { key: "returned", label: t("status.returned") },
  ];

  if (entries.length === 0) {
    return (
      <EmptyState
        title={t("dashboard.noEntries")}
        action={<Link href="/contribute" className="btn btn-gold">{t("dashboard.contributeFirst")}</Link>}
      >
        {t("dashboard.noEntriesDesc")}
      </EmptyState>
    );
  }

  return (
    <>
      <div className="tabs" role="group" aria-label={t("dashboard.filterByStatus")}>
        {TABS.map((t) => (
          <button key={t.key} type="button" className="tab" aria-pressed={tab === t.key} onClick={() => setTab(t.key)}>
            {t.label} ({count(t.key)})
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <EmptyState title={t("dashboard.nothingStatus", { status: tab })}>
          {t("dashboard.statusWillAppear")}
        </EmptyState>
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
                  <Link href={`/entries/${entry.id}/edit`} className="btn btn-outline btn-sm">{t("common.edit")}</Link>
                  <Link href={`/entries/${entry.id}`} className="btn btn-primary btn-sm">{t("common.view")}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
