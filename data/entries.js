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
    title: "Grandma's Hidden Riels",
    khmerName: "លុយរៀលរបស់លាកយាយ",
    description:
      "Old Cambodian riel notes that belonged to my grandmother. We don't know exactly how old they are, but some of them appear to be more than 50 years old. After she passed away, our family found the money hidden inside different parts of her old house, including behind wooden walls. We believe she had been secretly saving it without telling the rest of the family. We never found out exactly why she hid the money or what she had planned to use it for. By the time we discovered it, the notes were faded, torn, and worn from years of being kept away.",
    contributor: "Mengheng",
    place: "Kompong Cham",
    image: "/photos/money.jpg",
    date: "August 2026",
  },
    {
    title: "Dad's Old Music Player",
    khmerName: "ម៉ាញ៉េរបស់ប៉ា",
    description:
      "An old music player that belonged to my dad. When I was really young, he would play music on it almost every evening at home. He loved music, and the sound of his favorite songs became a familiar part of my childhood. As I grew older, my dad moved to a different home, but I kept the music player with me. It may not be worth much to other people, but every time I see it, I remember those evenings at home and the music that always filled the room.  ",
    contributor: "Kimhab",
    place: "Phnom Penh",
    image: "/photos/music.png",
    date: "August 2026",
  },
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
      "A painted portrait of my grandmother when she was a young woman in the 1990. The portrait was made shortly after she married my grandfather and was hung above their bed in their first home together. Over the years, they moved the portrait with them to every house they lived in. The frame has become worn with age, but my family has kept it just as it is. Today, it hangs in our home as a reminder of my grandmother's younger years and the life she and my grandfather built together.",
    contributor: "Roath Kimhong",
    place: "Phnom Penh",
    image: "/photos/portrait.png",
    date: "August 2026",
  },
   {
    title: "Carved Wooden Container",
    khmerName: "ប្រអប់ឈេីឆ្លាក់",
    description:
      "A carved wooden container that belonged to my grandparents. They received it as a gift in the 1980s, and my grandmother used it to store her jewelry and old photographs. Although it is not very old, my grandparent love it so much that they refuse to give to my uncle when he asked them for it",
    contributor: "Prak Sophors",
    place: "Phnom Penh",
    image: "/photos/wood-container.avif",
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
      "An old clay cooking pot and charcoal stove from my grandmother’s home in Takeo. She used them to cook rice and soup for the family, especially during family gatherings like Khmer New Year. After years of use, the pot became worn and stained, but it has remained in our family and is still being used today. Now that my grandmother is too old to cook, my mother has taken over and continues to use the same pot, keeping the tradition alive in our family.",
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
      "A traditional Khmer betel set kept by my grandfather. He used it to prepare betel leaf, areca nut, and lime for his mother. Every morning before starting work, he would carefully prepare it for her to eat. He bought the set at a market in Phnom Penh when he was a young man. After he passed away, my grandmother kept it on the family altar. The lacquer is scratched and the silver decoration has darkened with age, but we have never polished it because the marks remind us of him and the care he showed for his mother.  ",
    contributor: "Seng Chhaya",
    place: "Kampot Province",
    image: "/photos/betel.jpg",
    date: "August 2026",
  },
];

export default entries;