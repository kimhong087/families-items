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
    date: "June 2026",
  },
  {
    title: "Grandfather's Betel Box",
    khmerName: "ក្រឡាម្លូរបស់លោកតា",
    description:
      "A small round lacquer box with a worn gold rim that my grandfather opened every morning for his betel leaf and areca nut. He brought it back from Phnom Penh market in the 1950s. It now sits on our family altar, and when we lift the lid we still smell the areca.",
    contributor: "Nou Vireak",
    place: "Takeo Province",
    image: "/photos/betel.jpg",
    date: "June 2026",
  },
  {
    title: "Grandmother's Sampot Hol",
    khmerName: "សំពត់ហូលរបស់លោកយាយ",
    description:
      "A sampot hol patterned with small stars that my great-grandmother wove herself near Phnom Chisor before the war, and passed down to my grandmother. It was worn only at Khmer New Year and weddings. The silk still catches the light at certain angles, and my aunt keeps it wrapped in white cloth at the bottom of her wardrobe.",
    contributor: "Dith Vannak",
    place: "Takeo Province",
    image: "/photos/sampot-hol.jpg",
    date: "July 2026",
  },
  {
    title: "The Buffalo Bell",
    khmerName: "កង្វែរបស់លោកតា",
    description:
      "A wooden buffalo bell carved by my grandfather for Sarika, the family's last buffalo, named after the river near their village. Every morning he untied the bell before she went to the field, so he could always find her by its sound. When Sarika died, he hung the bell on the veranda beam, where it still hangs today.",
    contributor: "Loy Sreymom",
    place: "Kampong Thom Province",
    image: "/photos/buffalo-bell.jpg",
    date: "July 2026",
  },
  {
    title: "The Courtyard Water Pot",
    khmerName: "ក្អមរបស់លោកយាយ",
    description:
      "A tall clay water pot that stood in my grandmother's courtyard in Kampot for as long as anyone can remember. Neighbours passing by in the dry season drank from its tin cup without asking. When she moved in with us in 2015, the pot came too, and now it greets guests at our gate.",
    contributor: "Seng Chhaya",
    place: "Kampot Province",
    image: "/photos/water-pot.jpg",
    date: "August 2026",
  },
];

export default entries;