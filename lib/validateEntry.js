import { PLACES } from "./places";

// Character rules for the two single-alphabet fields. Every check runs on
// values that have already been trimmed, so whitespace-only input fails the
// "required" check below (trimmed length is 0).
//
// title:      English letters, digits, normal spaces, and normal English
//             punctuation. Khmer or other non-Latin letters are rejected.
// khmer_name: Khmer Unicode blocks (U+1780-U+17FF plus Khmer symbols
//             U+19E0-U+19FF) and normal spaces. English and other non-Khmer
//             letters are rejected.
const TITLE_RE = /^[A-Za-z0-9 .,!?;:'"()&/+-]+$/;
const KHMER_RE = /^[\u1780-\u17FF\u19E0-\u19FF ]+$/;

export function validateEntry(fields) {
  const errors = {};

  const title = String(fields.title ?? "").trim();
  const khmerName = String(fields.khmer_name ?? "").trim();
  const description = String(fields.description ?? "").trim();
  const contributor = String(fields.contributor ?? "").trim();
  const place = String(fields.place ?? "").trim();

  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length > 120) {
    errors.title = "Title must be 120 characters or fewer.";
  } else if (!TITLE_RE.test(title)) {
    errors.title = "Title can only use English letters, numbers, spaces, and punctuation.";
  }

  if (!khmerName) {
    errors.khmer_name = "Khmer name is required.";
  } else if (khmerName.length > 120) {
    errors.khmer_name = "Khmer name must be 120 characters or fewer.";
  } else if (!KHMER_RE.test(khmerName)) {
    errors.khmer_name = "Khmer name can only use Khmer characters and spaces.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length < 100) {
    errors.description = "Description must be at least 100 characters.";
  } else if (description.length > 5000) {
    errors.description = "Description must be 5000 characters or fewer.";
  }

  if (!contributor) {
    errors.contributor = "Contributor is required.";
  } else if (contributor.length > 120) {
    errors.contributor = "Contributor must be 120 characters or fewer.";
  }

  if (!place) {
    errors.place = "Please select a location.";
  } else if (!PLACES.includes(place)) {
    errors.place = "Please select one of the listed locations.";
  }

  return errors;
}