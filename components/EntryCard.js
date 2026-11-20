"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LotusMark } from "./Lotus";
import "./home.css";

// One archive card; the whole card links to /entries/[id]. Every photo is
// cropped to the same 4:3 frame so the grid stays even.
export default function EntryCard({ id, title, khmerName, description, place, image }) {
  const [broken, setBroken] = useState(false);
  const trimmedImage = image ? image.trim() : null;

  return (
    <Link href={`/entries/${id}`} className="entry-card-link">
      <article className="entry-card">
        <div className="entry-photo">
          {trimmedImage && !broken ? (
            <Image
              src={trimmedImage}
              alt={title}
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              loading="lazy"
              onError={() => setBroken(true)}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTNlY2U2Ii8+PC9zdmc+"
            />
          ) : (
            <div className="entry-photo-fallback" role="img" aria-label="Photo coming soon">
              <LotusMark size={56} />
            </div>
          )}
        </div>
        <div className="entry-body">
          <h3 className="entry-title">{title}</h3>
          {khmerName && <p className="entry-khmer">{khmerName}</p>}
          <p className="entry-desc">{description}</p>
          {place && (
            <p className="entry-place">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {place}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
