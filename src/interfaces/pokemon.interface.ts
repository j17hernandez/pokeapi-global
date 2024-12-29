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
}

export interface Species {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Species;
}
