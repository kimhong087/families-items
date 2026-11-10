import { LotusMark } from "./Lotus";

// Friendly empty / error panel. `action` is an optional button or link.
export default function EmptyState({ title, children, action }) {
  return (
    <div className="empty-state">
      <LotusMark size={64} />
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
