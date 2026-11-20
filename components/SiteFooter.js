"use client";

import collection from "../collection.config.js";
import { LotusMark } from "./Lotus";
import { useLanguage } from "../lib/language-context";

// Archive identity comes from collection.config.js, never hard-coded.
export default function SiteFooter() {
  const { t } = useLanguage();
  
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">
            <LotusMark size={34} />
            {collection.name}
          </div>
          <p className="footer-text">{collection.description}</p>
        </div>
        <div>
          <p className="footer-label">{t("footer.curatedBy")}</p>
          <p className="footer-value">{collection.curator}</p>
        </div>
        <div>
          <p className="footer-label">{t("footer.source")}</p>
          <p className="footer-value">{collection.source}</p>
        </div>
      </div>
      <div className="container footer-base">
        {t("footer.builtBy")}
      </div>
    </footer>
  );
}
