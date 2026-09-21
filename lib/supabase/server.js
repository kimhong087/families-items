import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Supabase client for the server (Server Components, Route Handlers,
// Server Actions). In Next.js 15 `cookies()` is async, so this factory
// is async and callers must await it.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    // eslint-disable-next-line no-undef
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components cannot write cookies. This only throws when
            // Supabase tries to refresh the auth session during a read-only
            // render — safe to ignore; reads and the page still work.
          }
        },
      },
    }
  );
}
