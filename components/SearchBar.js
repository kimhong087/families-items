// Hero search box. Typing filters the archive below live; pressing Search (or
// Enter) also scrolls down to the results.
export default function SearchBar({ value, onChange }) {
  function handleSubmit(event) {
    event.preventDefault();
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        aria-label="Search the archive"
        placeholder="Search by title, Khmer name, or story…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
