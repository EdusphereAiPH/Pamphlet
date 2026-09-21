export type Stat = { value: string; label: string };

export type Section = {
  eyebrow?: string;
  heading: string;
  body: string;
  quote?: { text: string; attribution?: string };
  bullets?: string[];
  groups?: { title: string; items: string[] }[];
  stats?: Stat[];
  image?: { src: string; alt: string };
};
