"use client";

import { LanguageProvider } from "../lib/language-context";
import { useEffect } from "react";
import { useLanguage } from "../lib/language-context";

function LanguageHtmlUpdater() {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Update html lang attribute when language changes
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);
  
  return null;
}

export default function ClientLayout({ children }) {
  return (
    <LanguageProvider>
      <LanguageHtmlUpdater />
      {children}
    </LanguageProvider>
  );
}