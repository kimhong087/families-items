"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { logout } from "../app/logout/actions";
import { LotusMark } from "./Lotus";
import NavMenu from "./NavMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../lib/language-context";

// Shared header. Reads the session on the server; "My entries" shows only when
// logged in, "Review" only when the existing is_reviewer() RPC says true.
export default function SiteHeader() {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [isReviewer, setIsReviewer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: reviewer, error } = await supabase.rpc("is_reviewer");
        setIsReviewer(!error && reviewer === true);
      } else {
        setIsReviewer(false);
      }
      
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  // Create navigation links based on user status
  const links = [
    { label: t("nav.home"), href: "/", match: "/" },
    { label: t("nav.browse"), href: "/#archive" },
    { label: t("nav.contribute"), href: "/contribute", match: "/contribute" },
    ...(user ? [{ label: t("nav.myEntries"), href: "/my-entries", match: "/my-entries" }] : []),
    ...(isReviewer ? [{ label: t("nav.review"), href: "/review", match: "/review" }] : []),
  ];

  if (isLoading) {
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
        </div>
      </header>
    );
  }

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
                <button type="submit" className="link-button">{t("nav.logout")}</button>
              </form>
              <LanguageSwitcher />
            </div>
          ) : (
            <div className="nav-user">
              <Link href="/login" className="nav-link">{t("nav.login")}</Link>
              <Link href="/signup" className="btn btn-primary btn-sm">{t("nav.signup")}</Link>
              <LanguageSwitcher />
            </div>
          )}
        </NavMenu>
      </div>
    </header>
  );
}
