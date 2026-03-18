export interface Champion {
  id: string;
  name: string;
  cost: number;
  traits: string[];
  image_url?: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  recipe: string[];
}

export interface Composition {
  id: string;
  name: string;
  tier: 'S' | 'A' | 'B' | 'C';
  description: string;
  champions: { name: string; items?: string[] }[];
  key_items: string[];
  playstyle: string;
}
