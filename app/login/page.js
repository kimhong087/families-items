import Link from "next/link";
import { login } from "./actions";
import AuthShell from "../../components/AuthShell";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const failed = params.error !== undefined;

  return (
    <AuthShell
      active="login"
      title="Welcome"
      subtitle="Sign in to contribute, explore, and help preserve our family histories."
    >
      <form action={login}>
        <FormField id="email" label="Email address" type="email" autoComplete="email" required placeholder="your@email.com" />
        <FormField id="password" label="Password" type="password" autoComplete="current-password" required placeholder="Your password" />

        {failed && (
          <p role="alert" className="notice notice-error" style={{ marginBottom: 16 }}>
            Invalid email or password
          </p>
        )}

        <SubmitButton pendingText="Logging in...">Sign in</SubmitButton>

        <p className="auth-hint">
          New to the archive? <Link href="/signup">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
