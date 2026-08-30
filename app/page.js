import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard";

// Sample entries for now — swap these for real family items as they come in.
// Photos live in public/photos/ — add the .jpg files there when you have them;
// until then each card shows its neutral "photo coming soon" placeholder.
const entries = [
  {
    title: "Grandmother's Krama",
    khmerName: "ក្រមារបស់លោកយាយ",
    description:
      "A hand-woven krama given to my grandmother as a wedding gift in Battambang in 1968. She carried rice seedlings in it, tied her babies to her back with it, and kept it folded at the foot of her bed until she passed away. The red has faded to pink, but my mother will not let anyone wash it again.",
    contributor: "Chan Sophea",
    place: "Battambang Province",
    image: "/photos/krama.jpg",
    date: "June 2026",
  },
  {
    title: "Grandfather's Betel Box",
    khmerName: "ក្រឡាម្លូរបស់លោកតា",
    description:
      "A small round lacquer box with a worn gold rim that my grandfather opened every morning for his betel leaf and areca nut. He brought it back from Phnom Penh market in the 1950s. It now sits on our family altar, and when we lift the lid we still smell the areca.",
    contributor: "Nou Vireak",
    place: "Takeo Province",
    image: "/photos/grandfathers-betel-box.jpg",
    date: "June 2026",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F5F0E6",
  },
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "64px 24px 80px",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#A8792C",
    margin: 0,
    fontWeight: 700
  },
  title: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 42,
    fontWeight: 700,
    color: "#171411",
    margin: "14px 0 12px",
    lineHeight: 1.15,
  },
  description: {
    fontSize: 17,
    lineHeight: 1.65,
    color: "#4A433B",
    margin: 0,
  },
  card: {
    marginTop: 24,
    padding: "18px 20px",
    backgroundColor: "#FFFCF7",
    border: "1px solid #DDD3C3",
    borderRadius: 12,
  },
  cardLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#A8792C",
    margin: 0,
    fontWeight: 700
  },
  cardValue: {
    fontSize: 15,
    color: "#4A433B",
    margin: "4px 0 0",
  },
  count: {
    fontSize: 13,
    letterSpacing: 1,
    color: "#A8792C",
    marginTop: 40,
  },
  footer: {
    marginTop: 56,
    paddingTop: 20,
    borderTop: "1px solid #DDD3C3",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#4A433B",
  },
};

export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>{collection.name}</h1>
        <p style={styles.description}>{collection.description}</p>

        <div style={styles.card}>
          <p style={styles.cardLabel}>Curated by</p>
          <p style={styles.cardValue}>{collection.curator}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardLabel}>Source</p>
          <p style={styles.cardValue}>{collection.source}</p>
        </div>

        {entries.map((entry) => (
          <EntryCard
            key={entry.title}
            title={entry.title}
            khmerName={entry.khmerName}
            description={entry.description}
            contributor={entry.contributor}
            place={entry.place}
            image={entry.image}
            date={entry.date}
          />
        ))}

        <p style={styles.count}>entries in the archive: 2</p>

        <footer style={styles.footer}>
          Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
          2026. This archive is under construction all semester. Come back in
          December.
        </footer>
      </div>
    </main>
  );
}
