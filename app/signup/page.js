import Link from "next/link";
import { signup } from "./actions";
import AuthShell from "../../components/AuthShell";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";

export default async function SignupPage({ searchParams }) {
  const params = await searchParams;
  const errorMessage = params.error;
  const checkEmail = params.check !== undefined;

  return (
    <AuthShell
      active="signup"
      title="Join the archive"
      subtitle="Create an account to share objects and stories from your family."
    >
      <form action={signup}>
        <FormField id="email" label="Email address" type="email" autoComplete="email" required placeholder="your@email.com" />
        <FormField id="password" label="Password" type="password" autoComplete="new-password" minLength={6} required placeholder="At least 6 characters" />

        {checkEmail && (
          <p className="notice notice-success" style={{ marginBottom: 16 }}>
            Account created — check your email to confirm it, then log in.
          </p>
        )}

        {errorMessage && (
          <p role="alert" className="notice notice-error" style={{ marginBottom: 16 }}>
            {errorMessage}
          </p>
        )}

        <SubmitButton pendingText="Creating account...">Create account</SubmitButton>

        <p className="auth-hint">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>
    </AuthShell>
  );
}
