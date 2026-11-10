import EntryCard from "./EntryCard";
import EmptyState from "./EmptyState";

// Loading, error, empty, no-match and result states for the archive grid.
export default function ArchiveGrid({ loading, loadError, total, results, visible, onMore, searching }) {
  if (loading) return <p className="notice" role="status">Loading entries…</p>;
  if (loadError) {
    return (
      <EmptyState title="We couldn't load the archive">
        Something went wrong while fetching entries. Please refresh the page to try again.
      </EmptyState>
    );
  }
  if (total === 0) {
    return (
      <EmptyState title="No entries in the archive yet">
        Published entries will appear here. Be the first to share an object that matters to your family.
      </EmptyState>
    );
  }
  if (results.length === 0 && searching) {
    return (
      <EmptyState title="No objects match your search">
        Try a different word, or search by the Khmer name or a detail from the story.
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
            Load more entries
          </button>
        </div>
      )}
    </>
  );
}
