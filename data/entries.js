// ============================================================
//  ARCHIVE ENTRIES
//
//  Every entry in the archive lives in this one array.
//  To add an item: copy an object, change the fields, and the
//  home page picks it up automatically — no other edits needed.
//
//  Photos go in public/photos/. If a photo file is missing,
//  EntryCard shows its "photo coming soon" placeholder instead.
// ============================================================

const entries = [
  {
    title: "Grandmother's Krama",
    khmerName: "ក្រមារបស់លោកយាយ",
    description:
      "A hand-woven krama given to my grandmother as a wedding gift in Battambang in 1968. She carried rice seedlings in it, tied her babies to her back with it, and kept it folded at the foot of her bed until she passed away. The red has faded to pink, but my mother will not let anyone wash it again.",
    contributor: "Chan Sophea",
    place: "Battambang Province",
    image: "/photos/krama.jpg",
    date: "August 2026",
  },
  {
    title: "Old Clay Cooking Pot",
    khmerName: "ក្រឡាម្លូរបស់លោកតា",
    description:
      "An old clay cooking pot and charcoal stove from my grandmother's home in Takeo. She used them to cook rice and soup for the family, especially during family gatherings like khmer new year. After years of use, the pot became worn and stained, but it was kept because it reminded the family of the simple meals and memories shared around the old cooking fire.",
    contributor: "Nou Vireak",
    place: "Takeo Province",
    image: "/photos/clay.jpg",
    date: "August 2026",
  },
  {
    title: "Grandmother's Sampot Hol",
    khmerName: "សំពត់ហូលរបស់លោកយាយ",
    description:
      "A sampot hol patterned with small stars that my great-grandmother wove herself before khmer rouge, and passed down to my grandmother. It was worn only at Khmer New Year and weddings. The silk still catches the light at certain angles, and my aunt keeps it wrapped in white cloth at the bottom of her wardrobe.",
    contributor: "Dith Vannak",
    place: "Takeo Province",
    image: "/photos/sampot-hol.jpg",
    date: "August 2026",
  },

  {
    title: "Grandpa's Betel Box",
    khmerName: "ប្រអប់ម្លូររបស់លេាកតា",
    description:
      "A traditional Khmer betel set kept by my grandfather. He used it to prepare for his mother to eat. He would carefully prepare it for her before starting his work each morning. He bought the set at a market in Phnom Penh when he was a young man. After he passed away, my grandmother kept it on the family altar. The lacquer is scratched and the silver decoration has darkened with age, but we never polished it because the marks remind us of him and the care he had for his mother.  ",
    contributor: "Seng Chhaya",
    place: "Kampot Province",
    image: "/photos/betel.jpg",
    date: "August 2026",
  },
];

export default entries;