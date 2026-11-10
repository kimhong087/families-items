"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Client half of the header: highlights the current page and runs the mobile
// menu toggle. The links and the account area (server-rendered, so the logout
// form can use the existing server action) are passed in.
export default function NavMenu({ links, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav id="site-nav" className="nav" data-open={open} aria-label="Main">
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link"
              aria-current={link.match && pathname === link.match ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {children}
      </nav>
    </>
  );
}
