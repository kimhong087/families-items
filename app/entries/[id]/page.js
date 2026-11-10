import Link from "next/link";
import { notFound } from "next/navigation";
import collection from "../../../collection.config.js";
import DeleteEntryButton from "../../../components/DeleteEntryButton";
import { LotusSpray } from "../../../components/Lotus";
import MetaRow from "../../../components/MetaRow";
import PageShell from "../../../components/PageShell";
import StatusBadge from "../../../components/StatusBadge";
import { formatDate } from "../../../lib/formatDate";
import { createClient } from "../../../lib/supabase/server";
import "../../../components/detail.css";

// Entry detail page. It is also the redirect target after a successful edit.
// Only real entries columns are shown: title, khmer_name, photo_url,
// description, contributor, place, created_at. "Source" is the archive-level
// source from collection.config.js (the table has no per-entry source).
export default async function EntryPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: entry, error } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !entry) {
    notFound();
  }

  // Non-published entries are visible only to their owner.
  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  if (entry.status !== "published" && (!user || user.id !== entry.owner)) {
    notFound();
  }

  // Owner-only tools. Hiding the buttons is only a UI convenience; RLS is what
  // actually stops other users from changing or deleting this row.
  const isOwner = Boolean(user && user.id === entry.owner);

  return (
    <PageShell>
      <article className="detail">
        <LotusSpray className="detail-lotus" />
        <div className="container">
          <Link href="/" className="back-link">← Back to archive</Link>

          <div className="detail-grid">
            <div className="detail-photo">
              <div className="detail-photo-frame">
                {entry.photo_url && <img src={entry.photo_url} alt={entry.title} />}
              </div>
            </div>

            <div>
              <h1 className="detail-title">{entry.title}</h1>
              <p className="detail-khmer">{entry.khmer_name}</p>
              {entry.status !== "published" && (
                <div className="detail-status"><StatusBadge status={entry.status} /></div>
              )}

              <div className="meta-list">
                <MetaRow label="Contributed by" icon={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>}>
                  {entry.contributor}
                </MetaRow>
                <MetaRow label="Place of origin" icon={<><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>}>
                  {entry.place}
                </MetaRow>
                {entry.created_at && (
                  <MetaRow label="Date added" icon={<><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>}>
                    {formatDate(entry.created_at, true)}
                  </MetaRow>
                )}
                <MetaRow label="Source" icon={<><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4Z" /><path d="M9 9h6M9 13h6" /></>}>
                  {collection.source}
                </MetaRow>
              </div>

              <p className="detail-story">{entry.description}</p>

              {isOwner && (
                <div className="detail-actions">
                  <Link href={`/entries/${entry.id}/edit`} className="btn btn-primary">Edit</Link>
                  <DeleteEntryButton entryId={entry.id} />
                </div>
              )}
            </div>
          </div>

          <div className="detail-quote">
            <p>“Small objects can hold big memories.”</p>
            <hr />
          </div>
        </div>
      </article>
    </PageShell>
  );
}
