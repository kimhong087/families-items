import Link from "next/link";
import ContributeForm from "../../components/ContributeForm";
import FormPage from "../../components/FormPage";
import { createClient } from "../../lib/supabase/server";

// Only logged-in users can reach the contribute form. This server component
// checks the session first: logged out visitors see a message and a link to
// the login page instead of the form. The form itself re-checks auth at
// submit time as a second line of defense.
export default async function ContributePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <FormPage
      title="Contribute an Entry"
      lead="Share a meaningful object, photo, or story from your family's history."
      backHref="/"
      backLabel="Back to archive"
    >
      {user ? (
        <ContributeForm />
      ) : (
        <div className="notice notice-info">
          <p style={{ margin: "0 0 10px" }}>You need to log in to contribute an entry.</p>
          <Link href="/login" className="btn btn-primary btn-sm">Log in</Link>
        </div>
      )}
    </FormPage>
  );
}
