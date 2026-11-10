// "Oct 20, 2024" from a Supabase timestamp. Fixed to UTC so the server and the
// browser render the same text (no hydration mismatch).
export function formatDate(value, long = false) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: long ? "long" : "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
