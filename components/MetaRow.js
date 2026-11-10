// One labelled detail (icon + label + value) for the entry detail page.
export default function MetaRow({ icon, label, children }) {
  return (
    <div className="meta-row">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {icon}
      </svg>
      <div>
        <p className="meta-label">{label}</p>
        <p className="meta-value">{children}</p>
      </div>
    </div>
  );
}
