"use client";

import { useState } from "react";
import { LotusMark } from "./Lotus";
import "./dashboard.css";

// Small 4:3 photo used by My Entries and the reviewer queue.
export default function DashThumb({ src, alt }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="dash-thumb">
      {src && !broken ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} />
      ) : (
        <div className="entry-photo-fallback" role="img" aria-label="Photo coming soon">
          <LotusMark size={40} />
        </div>
      )}
    </div>
  );
}
