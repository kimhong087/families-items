const LABELS = { pending: "Pending", published: "Published", returned: "Returned" };

export default function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{LABELS[status] ?? status}</span>;
}
