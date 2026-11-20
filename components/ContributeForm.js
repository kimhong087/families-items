"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PLACES } from "../lib/places";
import { validateEntry } from "../lib/validateEntry";
import { validatePhoto } from "../lib/photo";
import { submitEntry } from "../lib/entrySubmit";
import FormField from "./FormField";
import FormTips from "./FormTips";
import PhotoDropzone from "./PhotoDropzone";
import { useLanguage } from "../lib/language-context";
import "./form.css";

const EMPTY = { title: "", khmer_name: "", description: "", place: "", contributor: "" };

// Shared entry form. mode "create" is used by /contribute. mode "edit" is used
// by /entries/[id]/edit: it pre-fills the existing values (`initial`), keeps
// the current photo unless a replacement is chosen, and updates only the
// allowed columns. Validation and saving are unchanged (lib/validateEntry.js,
// lib/photo.js, lib/entrySubmit.js); this file only handles form state + UI.
export default function ContributeForm({ mode = "create", entryId = null, initial = null }) {
  const { t } = useLanguage();
  const router = useRouter();
  const photoInputRef = useRef(null);
  const hasCurrentPhoto = Boolean(initial && initial.photo_url);
  // In edit mode a photo is optional: an empty field keeps the current photo.
  const photoRequired = mode !== "edit" || !hasCurrentPhoto;
  const [fields, setFields] = useState({
    title: initial?.title ?? "",
    khmer_name: initial?.khmer_name ?? "",
    description: initial?.description ?? "",
    place: initial?.place ?? "",
    contributor: initial?.contributor ?? "",
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  function handleTextChange(event) {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handlePhoto(file) {
    setPhoto(file);
    setErrors((prev) => ({ ...prev, photo: validatePhoto(file, photoRequired) }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;

    const fieldErrors = validateEntry(fields);
    const photoError = validatePhoto(photo, photoRequired);
    const allErrors = photoError ? { ...fieldErrors, photo: photoError } : fieldErrors;
    if (Object.keys(allErrors).length > 0) {
      // Nothing is uploaded or saved until validation passes.
      setErrors(allErrors);
      setSubmitError("");
      return;
    }

    setErrors({});
    setSubmitError("");
    setSubmitSuccess("");
    setSaving(true);
    const result = await submitEntry({ mode, entryId, initial, fields, photo });
    setSaving(false);

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }
    if (result.mode === "edit") {
      router.push(`/entries/${result.id}`);
      return;
    }
    // Create: stay on the page, show the pending-review message, reset the form.
    setSubmitSuccess(t("notice.contributionSubmitted"));
    setFields(EMPTY);
    setPhoto(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  const field = (name) => ({ value: fields[name], onChange: handleTextChange, error: errors[name] });

  return (
    <form onSubmit={handleSubmit} noValidate>
      {submitError && <p role="alert" className="notice notice-error form-notice">{submitError}</p>}
      {submitSuccess && (
        <p role="status" className="notice notice-success form-notice">
          {submitSuccess} <Link href="/my-entries">{t("notice.trackInMyEntries")}</Link>
        </p>
      )}
      <div className="form-columns">
        <div>
          <div className="field-row">
            <FormField id="title" label={t("form.title")} required placeholder={t("form.titlePlaceholder")} {...field("title")} />
            <FormField id="khmer_name" label={t("form.khmerName")} required lang="km" placeholder={t("form.khmerNamePlaceholder")} {...field("khmer_name")} />
          </div>
          <FormField id="description" label={t("form.description")} required as="textarea" rows={6} placeholder={t("form.descriptionPlaceholder")} hint={t("form.descriptionHint")} {...field("description")} />
          <div className="field-row">
            <FormField id="place" label={t("form.place")} required as="select" {...field("place")}>
              <option value="">{t("form.placePlaceholder")}</option>
              {PLACES.map((place) => (
                <option key={place} value={place}>{place}</option>
              ))}
            </FormField>
            <FormField id="contributor" label={t("form.contributor")} required placeholder={t("form.contributorPlaceholder")} {...field("contributor")} />
          </div>
        </div>
        <div>
          <PhotoDropzone
            inputRef={photoInputRef}
            file={photo}
            onFile={handlePhoto}
            error={errors.photo}
            currentUrl={hasCurrentPhoto ? initial.photo_url : null}
            required={photoRequired}
          />
          <FormTips />
        </div>
      </div>
      <div className="form-submit">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? t("common.saving") : mode === "edit" ? t("form.saveChanges") : t("form.submitEntry")}
        </button>
      </div>
    </form>
  );
}
