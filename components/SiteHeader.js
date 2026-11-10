import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import { logout } from "../app/logout/actions";
import { LotusMark } from "./Lotus";
import NavMenu from "./NavMenu";

// Shared header. Reads the session on the server; "My entries" shows only when
// logged in, "Review" only when the existing is_reviewer() RPC says true.
export default async function SiteHeader() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  let isReviewer = false;
  if (user) {
    const { data: reviewer, error } = await supabase.rpc("is_reviewer");
    isReviewer = !error && reviewer === true;
  }

  const links = [
    { label: "Home", href: "/", match: "/" },
    { label: "Browse", href: "/#archive" },
    { label: "Contribute", href: "/contribute", match: "/contribute" },
    ...(user ? [{ label: "My entries", href: "/my-entries", match: "/my-entries" }] : []),
    ...(isReviewer ? [{ label: "Review", href: "/review", match: "/review" }] : []),
  ];

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          <LotusMark className="brand-mark" size={38} />
          <span className="brand-text">
            <span className="brand-name">Khmer Living Archive</span>
            <span className="brand-sub">បណ្ណសារគ្រួសារខ្មែរ</span>
          </span>
        </Link>
        <NavMenu links={links}>
          {user ? (
            <div className="nav-user">
              <span className="avatar" aria-hidden="true">{(user.email ?? "?").charAt(0)}</span>
              <span className="nav-email">{user.email}</span>
              <form action={logout}>
                <button type="submit" className="link-button">Log out</button>
              </form>
            </div>
          ) : (
            <div className="nav-user">
              <Link href="/login" className="nav-link">Log in</Link>
              <Link href="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </div>
          )}
        </NavMenu>
      </div>
    </header>
  );
}
