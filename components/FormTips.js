import "./form.css";

export default function FormTips() {
  return (
    <aside className="tips" aria-label="Tips for a good contribution">
      <h2>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
        </svg>
        Tips for a good contribution
      </h2>
      <ul>
        <li>Share the story behind the item.</li>
        <li>Say where it came from and who it belonged to.</li>
        <li>Add a clear, well-lit photo.</li>
        <li>Be respectful of people and culture.</li>
      </ul>
    </aside>
  );
}
