"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function signup(formData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");

  if (data.session) {
    // Email confirmation is off for this project: the account is active now.
    redirect("/");
  }

  // Email confirmation is on: the account is created but not active until
  // the user opens the confirmation link from their inbox.
  redirect("/signup?check=1");
}