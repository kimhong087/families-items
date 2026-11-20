"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "./translations/en.js";
import km from "./translations/km.js";

const LanguageContext = createContext();

const translations = {
  en,
  km
};

export function LanguageProvider({ children }) {
  // Initialize state with a function that only runs on client
  const [language, setLanguage] = useState(() => {
    // Default to "en" during SSR
    if (typeof window === "undefined") {
      return "en";
    }
    
    // On client, check localStorage
    const savedLanguage = localStorage.getItem("khmer-archive-language");
    return (savedLanguage === "en" || savedLanguage === "km") ? savedLanguage : "en";
  });
  
  // Save language preference to localStorage and update html lang attribute
  useEffect(() => {
    localStorage.setItem("khmer-archive-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const switchLanguage = (lang) => {
    if (lang === "en" || lang === "km") {
      setLanguage(lang);
    }
  };

  const t = (key, params = {}) => {
    // Handle nested keys like "nav.home" or "form.title"
    const keys = key.split(".");
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} in language ${language}`);
        return key;
      }
    }

    // If the value is a function (for dynamic translations), call it with params
    if (typeof value === "function") {
      return value(params);
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}