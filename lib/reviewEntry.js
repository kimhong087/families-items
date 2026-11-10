// The ONE place that calls the existing review_entry RPC. The client never
// updates entries.status directly.
//
// Argument names match the existing database function, as used by the
// original review page: review_entry(entry_id, decision), where decision is
// "published" or "returned".
const ARG_ENTRY_ID = "entry_id";
const ARG_DECISION = "decision";

// Resolves to { ok: true } only when the RPC returned exactly `true`.
// { ok: false, message } for an RPC error or a `false` result.
export async function reviewEntry(supabase, entryId, newStatus) {
  const { data, error } = await supabase.rpc("review_entry", {
    [ARG_ENTRY_ID]: entryId,
    [ARG_DECISION]: newStatus, // "published" or "returned"
  });

  if (error) {
    console.error("review_entry failed:", error);
    return { ok: false, message: "We couldn't save that decision. Please try again." };
  }
  if (data !== true) {
    return { ok: false, message: "That entry wasn't updated. It may already have been reviewed, or you may not have permission." };
  }
  return { ok: true };
}
