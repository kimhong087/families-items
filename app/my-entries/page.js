import { redirect } from "next/navigation";
import collection from "../../collection.config.js";
import MyEntriesList from "../../components/MyEntriesList";
import PageIntro from "../../components/PageIntro";
import PageShell from "../../components/PageShell";
import { createClient } from "../../lib/supabase/server";
import "../../components/dashboard.css";

export default async function MyEntriesPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) redirect("/login");

  // Owner-only query, newest first.
  const { data: entries, error } = await supabase
    .from("entries")
    .select("id, title, khmer_name, description, photo_url, status, created_at")
    .eq("owner", user.id)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching user entries:", error);

  return (
    <PageShell>
      <PageIntro title="My Entries">
        View and track the status of your contributions to {collection.name}.
      </PageIntro>
      <div className="container dash">
        {error && (
          <p role="alert" className="notice notice-error queue-note">
            We couldn&apos;t load your entries. Please refresh the page to try again.
          </p>
        )}
        <MyEntriesList entries={entries || []} />
      </div>
    </PageShell>
  );
}
