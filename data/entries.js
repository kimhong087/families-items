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
    title: "A Meaningful Coinbox",
    khmerName: "ប្រអប់កាក់",
    description:
      "A small handwoven coin box that belonged to my grandmother. She had a simple hobby of saving coins in it, putting away a few whenever she had some left over. To other people, it might just look like an ordinary little box, but to our family, it means much more. After she passed away, we kept the box because it reminds us of her and the little habits that made her who she was. We no longer use it to save coins, but we keep it as a small piece of her that remains with us.",
    contributor: "Sun Savuth",
    place: "Phnom Penh",
    image: "/photos/coin.png",
    date: "August 2026",
  },
     {
    title: "Portrait of a young woman",
    khmerName: "អនុស្សាវរីយ៍វ័យក្មេងរបស់លោកយាយ",
    description:
      "A painted portrait of my grandmother when she was a young woman in the 1980s. The portrait was made shortly after she married my grandfather and was hung above their bed in their first home together. Over the years, they moved the portrait with them to every house they lived in. The frame has become worn with age, but my family has kept it just as it is. Today, it hangs in our home as a reminder of my grandmother's younger years and the life she and my grandfather built together.",
    contributor: "Roath Kimhong",
    place: "Phnom Penh",
    image: "/photos/portrait.png",
    date: "August 2026",
  },
   {
    title: "Carved Wooden Container",
    khmerName: "ប្រអប់ឈេីឆ្លាក់",
    description:
      "A carved wooden container that belonged to my grandparents. They received it as a gift in the 1980s, and my grandmother used it to store her jewelry and old photographs. Although it is not very old, it has been moved with them to every house they have lived in. My grandparents have always loved it, and over the years, it has become a small reminder of the life they built together.",
    contributor: "Prak Sophors",
    place: "Phnom Penh",
    image: "/photos/wood-container.png",
    date: "August 2026",
  },
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
    image: "/photos/clay.avif ",
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