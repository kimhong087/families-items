// Decorative lotus line-art. LotusMark is the small logo; LotusSpray is the
// larger botanical corner ornament. Both use currentColor so CSS sets the tint.

export function LotusMark({ size = 40, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M32 8c-7 8-8 18 0 30 8-12 7-22 0-30Z" />
      <path d="M32 38C22 36 14 28 12 18c10 1 17 8 20 20Z" />
      <path d="M32 38c10-2 18-10 20-20-10 1-17 8-20 20Z" />
      <path d="M32 40C20 42 10 38 4 30c4 12 16 20 28 20s24-8 28-20c-6 8-16 12-28 10Z" />
      <path d="M32 50v6M24 56h16" />
    </svg>
  );
}

export function LotusSpray({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M210 4C170 14 130 40 110 90S60 160 8 172" />
      <path d="M110 90c-4-20 6-40 24-50 4 22-6 40-24 50Z" />
      <path d="M110 90c20-8 28-28 22-46-18 8-26 26-22 46Z" />
      <path d="M60 138c-4-18 4-34 20-44 6 18-2 34-20 44Z" />
      <path d="M150 52c18-2 32-12 38-28-18-2-32 8-38 28Z" />
      <path d="M84 116c-14-8-32-6-44 6 14 10 32 8 44-6Z" />
      <path d="M170 30c-6 10-6 22 2 30" />
      <circle cx="132" cy="74" r="3" />
      <circle cx="96" cy="124" r="3" />
      <circle cx="176" cy="22" r="2.5" />
    </svg>
  );
}
