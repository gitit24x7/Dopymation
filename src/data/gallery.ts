export type GalleryItem = {
  id: string;
  category: string;
  title: string;
  seed: string;
  span: "tall" | "short";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", category: "Weddings", title: "First Look Reel", seed: "dopymation-wedding-firstlook", span: "tall" },
  { id: "g2", category: "Baby Showers", title: "Bump to Bloom", seed: "dopymation-babyshower-bloom", span: "short" },
  { id: "g3", category: "Birthdays", title: "Turning Ten", seed: "dopymation-birthday-turningten", span: "short" },
  { id: "g4", category: "Anniversaries", title: "Twenty-Five Years, One Frame", seed: "dopymation-anniversary-25", span: "tall" },
  { id: "g5", category: "Corporate Events", title: "Launch Motion", seed: "dopymation-corporate-launch", span: "short" },
  { id: "g6", category: "Baptisms", title: "Naming Day", seed: "dopymation-baptism-namingday", span: "tall" },
  { id: "g7", category: "Birthdays", title: "Sweet Sixteen", seed: "dopymation-birthday-sixteen", span: "short" },
  { id: "g8", category: "Weddings", title: "Save the Date", seed: "dopymation-wedding-savethedate", span: "tall" },
];
