"use client";

import { useEffect, useState } from "react";
import "./form.css";

// Click-or-drag photo picker with a live preview. The real <input type="file">
// stays in the DOM (keyboard + screen-reader friendly); `inputRef` is owned by
// the form so it can reset the field after a successful submit.
export default function PhotoDropzone({ inputRef, file, onFile, error, currentUrl, required }) {
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
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
        {currentUrl ? "Replace photo (optional)" : "Add a photo"}
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
            <img className="dropzone-preview" src={shown} alt={preview ? "Selected photo preview" : "Current photo"} />
            <span>{preview ? file.name : "Current photo — click or drop to replace"}</span>
          </>
        ) : (
          <>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.8" />
              <path d="m21 16-5-5-9 9" />
            </svg>
            <strong>Click to upload or drag and drop</strong>
            <span>JPG, PNG, or WebP · up to 5 MB</span>
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
      {currentUrl && !file && <p className="field-hint">Leave this empty to keep the current photo.</p>}
      {error && <p id="photo-error" className="field-error">{error}</p>}
    </div>
  );
}
