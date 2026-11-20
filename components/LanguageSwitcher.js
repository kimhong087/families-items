"use client";

import { useLanguage } from "../lib/language-context";

export default function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={`lang-btn ${language === "en" ? "lang-btn-active" : ""}`}
        onClick={() => switchLanguage("en")}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="lang-separator" aria-hidden="true">/</span>
      <button
        type="button"
        className={`lang-btn ${language === "km" ? "lang-btn-active" : ""}`}
        onClick={() => switchLanguage("km")}
        aria-pressed={language === "km"}
        aria-label="Switch to Khmer"
      >
        ខ្មែរ
      </button>
    </div>
  );
}