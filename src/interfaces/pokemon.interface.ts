export interface Pokemon {
  name: string;
  url: string;
  favorite?: boolean;
}

export interface Response {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonDetail {
  height: number;
  id: number;
  name: string;
  types: Type[];
  weight: number;
  sprites: Sprites;
  favorite?: boolean;
}

export interface Species {
  name: string;
  url: string;
}

export interface Other {
  "official-artwork": OfficialArtwork;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}
export interface Sprites {
  other?: Other;
}

export interface Type {
  slot: number;
  type: Species;
}
