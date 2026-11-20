"use client";

import EntryCard from "./EntryCard";
import EmptyState from "./EmptyState";
import { useLanguage } from "../lib/language-context";

// Loading, error, empty, no-match and result states for the archive grid.
export default function ArchiveGrid({ loading, loadError, total, results, visible, onMore, searching }) {
  const { t } = useLanguage();
  
  if (loading) return <p className="notice" role="status">{t("archive.loading")}</p>;
  if (loadError) {
    return (
      <EmptyState title={t("archive.error")}>
        {t("emptyState.description")}
      </EmptyState>
    );
  }
  if (total === 0) {
    return (
      <EmptyState title={t("dashboard.noEntries")}>
        {t("dashboard.noEntriesDesc")}
      </EmptyState>
    );
  }
  if (results.length === 0 && searching) {
    return (
      <EmptyState title={t("emptyState.title")}>
        {t("emptyState.description")}
      </EmptyState>
    );
  }

  return (
    <>
      <div className="entry-grid">
        {results.slice(0, visible).map((entry) => (
          <EntryCard key={entry.id} {...entry} />
        ))}
      </div>
      {results.length > visible && (
        <div className="load-more">
          <button type="button" className="btn btn-outline" onClick={onMore}>
            {t("archive.loadMore")}
          </button>
        </div>
      )}
    </>
  );
}
