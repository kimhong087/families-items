import { redirect } from "next/navigation";
import PageIntro from "../../components/PageIntro";
import PageShell from "../../components/PageShell";
import ReviewQueue from "../../components/ReviewQueue";
import EmptyState from "../../components/EmptyState";
import { createClient } from "../../lib/supabase/server";
import "../../components/dashboard.css";

// Reviewer queue. Permission comes from the existing is_reviewer() RPC; people
// who are not reviewers never trigger the pending-entries query. Entries are
// fetched pending-only, oldest first. Publish / Return live in ReviewQueue and
// go through the review_entry RPC (lib/reviewEntry.js).
export default async function ReviewPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) redirect("/login");

  const { data: reviewer, error: reviewerError } = await supabase.rpc("is_reviewer");
  const isReviewer = !reviewerError && reviewer === true;

  let entries = [];
  let loadError = false;
  if (isReviewer) {
    const { data, error } = await supabase
      .from("entries")
      .select("id, title, khmer_name, description, photo_url, contributor, place, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching pending entries:", error);
      loadError = true;
    }
    entries = data ?? [];
  }

  return (
    <PageShell>
      <PageIntro title="Pending Entries">
        Review new contributions from the community, oldest first.
      </PageIntro>
      <div className="container dash">
        {isReviewer ? (
          <ReviewQueue initialEntries={entries} loadError={loadError} />
        ) : (
          <EmptyState title="Reviewers only">
            {reviewerError
              ? "We couldn't check your reviewer permission. Please try again."
              : "This page is for archive reviewers. If you think you should have access, contact the curator."}
          </EmptyState>
        )}
      </div>
    </PageShell>
  );
}
