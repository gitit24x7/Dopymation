export type Era = {
  id: string;
  index: string;
  name: string;
  headline: string;
  body: string;
  caption?: { left: string; right: string };
  background: string;
  foreground: string;
  accent: string;
};

export const eras: Era[] = [
  {
    id: "bauhaus",
    index: "01",
    name: "Bauhaus",
    headline: "Bauhaus",
    body: "Primary color, geometry and typographic weight. The shapes drift with your cursor.",
    background: "#e8b93a",
    foreground: "#141005",
    accent: "#c0392b",
  },
  {
    id: "swiss",
    index: "02",
    name: "Swiss",
    headline: "Grid is the message.",
    body: "Alignment does the work decoration usually tries to. Pure hierarchy, ruthless white space, one weight of ink.",
    caption: { left: "Helvetica Rule", right: "Since 1957" },
    background: "#f2efe6",
    foreground: "#101010",
    accent: "#d6222f",
  },
  {
    id: "brutalism",
    index: "03",
    name: "Brutalism",
    headline: "Brutalism",
    body: "Raw concrete, hard shadows and no apology. Structure becomes the ornament.",
    background: "#8f8b83",
    foreground: "#0c0c0c",
    accent: "#f2c308",
  },
  {
    id: "art-deco",
    index: "04",
    name: "Art Deco",
    headline: "Art Deco",
    body: "Symmetry, gilded lines and the glamour of the machine age.",
    background: "#0e0d0b",
    foreground: "#e7c565",
    accent: "#e7c565",
  },
  {
    id: "indian",
    index: "05",
    name: "Indian",
    headline: "Indian",
    body: "Jewel tones, gold foil and a mandala that turns slow as ceremony.",
    background: "#4a0f14",
    foreground: "#f3dfa8",
    accent: "#e7c565",
  },
];
