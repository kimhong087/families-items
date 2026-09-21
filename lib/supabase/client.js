import { createBrowserClient } from "@supabase/ssr";

// Supabase client for the browser (Client Components).
// NEXT_PUBLIC_ vars are inlined by Next at build time. The publishable
// key is meant to be exposed in the browser — no secret lives here.
// (`process` is a Next.js global; the shared ESLint config that lives
// outside this repo doesn't declare it, hence the no-undef disables.)
export function createClient() {
  return createBrowserClient(
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}
