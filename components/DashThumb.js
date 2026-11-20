"use client";

import { useState } from "react";
import Image from "next/image";
import { LotusMark } from "./Lotus";
import "./dashboard.css";

// Small 4:3 photo used by My Entries and the reviewer queue.
export default function DashThumb({ src, alt }) {
  const [broken, setBroken] = useState(false);
  const trimmedSrc = src ? src.trim() : null;
  
  return (
    <div className="dash-thumb">
      {trimmedSrc && !broken ? (
        <Image
          src={trimmedSrc}
          alt={alt}
          width={200}
          height={150}
          sizes="(max-width: 768px) 100vw, 200px"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          loading="lazy"
          onError={() => setBroken(true)}
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTNlY2U2Ii8+PC9zdmc+"
        />
      ) : (
        <div className="entry-photo-fallback" role="img" aria-label="Photo coming soon">
          <LotusMark size={40} />
        </div>
      )}
    </div>
  );
}
