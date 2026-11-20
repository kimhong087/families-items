"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../lib/language-context";
import "./form.css";

// Click-or-drag photo picker with a live preview. The real <input type="file">
// stays in the DOM (keyboard + screen-reader friendly); `inputRef` is owned by
// the form so it can reset the field after a successful submit.
export default function PhotoDropzone({ inputRef, file, onFile, error, currentUrl, required }) {
  const { t } = useLanguage();
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const prevUrlRef = useRef(null);

  useEffect(() => {
    // Cleanup previous URL if it exists
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = null;
    }
    
    // Create new URL if we have a file
    if (file) {
      const url = URL.createObjectURL(file);
      prevUrlRef.current = url;
      // Schedule state update to avoid synchronous setState in effect
      queueMicrotask(() => {
        setPreviewUrl(url);
      });
    } else {
      // Schedule state update to avoid synchronous setState in effect
      queueMicrotask(() => {
        setPreviewUrl(null);
      });
    }
  }, [file]);

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (!dropped) return;
    // Put the file into the real input so the form state and input agree.
    const transfer = new DataTransfer();
    transfer.items.add(dropped);
    inputRef.current.files = transfer.files;
    onFile(dropped);
  }

  // `file` can be cleared a render before the effect clears previewUrl.
  const preview = file ? previewUrl : null;
  const shown = preview || currentUrl;

  return (
    <div className="field">
      <span className="field-label" id="photo-label">
        {currentUrl ? t("form.photoOptional") : t("form.photo")}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </span>
      <label
        className="dropzone"
        data-drag={dragging}
        aria-invalid={Boolean(error)}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {shown ? (
          <>
            {preview ? (
              // For blob URLs from file selection, use regular img tag
              <img className="dropzone-preview" src={shown} alt={t("form.currentPhoto")} />
            ) : (
              // For existing images from URLs, use Next.js Image component
              <Image
                src={shown.trim()}
                alt={t("form.currentPhoto")}
                width={200}
                height={150}
                sizes="200px"
                className="dropzone-preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTNlY2U2Ii8+PC9zdmc+"
              />
            )}
            <span>{preview ? file.name : t("form.photoDropzone")}</span>
          </>
        ) : (
          <>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.8" />
              <path d="m21 16-5-5-9 9" />
            </svg>
            <strong>{t("form.photoDropzone")}</strong>
            <span>{t("form.photoTypes")} · {t("form.photoSizeLimit")}</span>
          </>
        )}
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          ref={inputRef}
          aria-labelledby="photo-label"
          aria-describedby={error ? "photo-error" : undefined}
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>
      {currentUrl && !file && <p className="field-hint">{t("form.currentPhoto")}</p>}
      {error && <p id="photo-error" className="field-error">{error}</p>}
    </div>
  );
}
