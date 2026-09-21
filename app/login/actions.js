"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

// Log in with email + password. Any failure redirects back with a single
// generic message — never reveal whether the email exists, whether the
// password was wrong, or why the account is unavailable.
export async function login(formData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=1");
  }

  revalidatePath("/", "layout");
  redirect("/");
}