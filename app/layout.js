import collection from "../collection.config.js";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
};

// Fonts: Playfair Display (headings), Inter (body) and the Noto Khmer faces so
// Khmer text renders well on every device. Each CSS font stack falls back to
// system fonts if Google Fonts is unreachable.
const FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Khmer:wght@400;500;600&family=Noto+Serif+Khmer:wght@400;600;700&family=Playfair+Display:wght@500;600;700&display=swap";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
