"use client";

import { useLanguage } from "../lib/language-context";

export default function StatusBadge({ status }) {
  const { t } = useLanguage();
  const label = t(`status.${status}`);
  
  return <span className={`badge badge-${status}`}>{label ?? status}</span>;
}
