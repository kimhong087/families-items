"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase/client";
import Hero from "./Hero";
import SearchBar from "./SearchBar";
import ArchiveGrid from "./ArchiveGrid";

const PAGE_SIZE = 9;

// Homepage body: hero with search, then the published entries. Entries load
// from the Supabase "entries" table in the browser (published only, newest
// first); search then filters them client-side over title, Khmer name and
// story. An empty query shows everything; a query that starts with a space
// matches nothing until the space is removed (existing behaviour).
export default function ArchiveSearch() {
  const [entries, setEntries] = useState(null); // null = still loading
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let active = true;
    createClient()
      .from("entries")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setLoadError(true);
          setEntries([]);
          return;
        }
        setEntries(
          (data ?? []).map((row) => ({
            id: row.id,
            title: row.title ?? "",
            khmerName: row.khmer_name ?? "",
            description: row.description ?? "",
            place: row.place ?? "",
            image: row.photo_url,
          }))
        );
      });
    return () => {
      active = false;
    };
  }, []);

  const loading = entries === null;
  const search = query.trim().toLowerCase();
  const results =
    loading || loadError
      ? []
      : query === ""
        ? entries
        : /^\s/.test(query)
          ? []
          : entries.filter((e) =>
              [e.title, e.khmerName, e.description].some((f) => f.toLowerCase().includes(search))
            );

  function handleQuery(value) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }

  return (
    <>
      <Hero>
        <SearchBar value={query} onChange={handleQuery} />
      </Hero>
      <div className="archive-wrapper">
        <section id="archive" className="container archive-section" aria-labelledby="archive-title">
          <div className="archive-head">
            <div>
              <p className="kicker">The collection</p>
              <h2 id="archive-title">Stories from Khmer Families</h2>
              {!loading && !loadError && entries.length > 0 && (
                <p className="archive-count" aria-live="polite">
                  {query === "" ? `${entries.length} published` : `${results.length} of ${entries.length}`}{" "}
                  {entries.length === 1 ? "entry" : "entries"}
                </p>
              )}
            </div>
            <Link href="/contribute" className="btn btn-gold">Contribute an entry</Link>
          </div>
          <ArchiveGrid
            loading={loading}
            loadError={loadError}
            total={entries?.length ?? 0}
            results={results}
            visible={visible}
            onMore={() => setVisible((n) => n + PAGE_SIZE)}
            searching={query !== ""}
          />
        </section>
      </div>
    </>
  );
}
