import ArchiveSearch from "../components/ArchiveSearch";
import PageShell from "../components/PageShell";

// Homepage: hero straight into the published entries (no category section).
// Entries load in the browser inside ArchiveSearch; data/entries.js is kept
// for reference only.
export default function Home() {
  return (
    <PageShell>
      <ArchiveSearch />
    </PageShell>
  );
}
