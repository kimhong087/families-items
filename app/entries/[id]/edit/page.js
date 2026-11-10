import { notFound } from "next/navigation";
import ContributeForm from "../../../../components/ContributeForm";
import FormPage from "../../../../components/FormPage";
import { createClient } from "../../../../lib/supabase/server";

// Edit page for one entry. Only the entry's owner can reach the form: this
// server component loads the row, compares the signed-in user with the row's
// owner column, and 404s otherwise. RLS is the real enforcement.
export default async function EditEntryPage({ params }) {
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

  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user ?? null;
  const isOwner = Boolean(user && user.id === entry.owner);

  // Allow owners to edit their entries regardless of status
  if (!isOwner) {
    notFound();
  }

  return (
    <FormPage
      title="Edit Entry"
      lead={`Editing: ${entry.title}`}
      backHref={`/entries/${entry.id}`}
      backLabel="Back to the entry"
    >
      <ContributeForm
        mode="edit"
        entryId={entry.id}
        initial={{
          title: entry.title,
          khmer_name: entry.khmer_name,
          description: entry.description,
          place: entry.place,
          contributor: entry.contributor,
          photo_url: entry.photo_url,
        }}
      />
    </FormPage>
  );
}
