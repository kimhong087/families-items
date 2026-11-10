import collection from "../collection.config.js";
import { LotusMark } from "./Lotus";

// Archive identity comes from collection.config.js, never hard-coded.
export default function SiteFooter() {
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
          <p className="footer-label">Curated by</p>
          <p className="footer-value">{collection.curator}</p>
        </div>
        <div>
          <p className="footer-label">Source</p>
          <p className="footer-value">{collection.source}</p>
        </div>
      </div>
      <div className="container footer-base">
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026.
      </div>
    </footer>
  );
}
