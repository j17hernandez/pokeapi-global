import { defineStore } from "pinia";
import type { Pokemon, PokemonDetail } from "@/interfaces/pokemon.interface";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [] as Pokemon[],
    selectedPokemon: null as PokemonDetail | null,
    isLoading: false,
    search: "",
  }),

  actions: {
    getFilteredPokemonList() {
      if (!this.search) return this.pokemonList;
      return this.pokemonList.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    getFavoritePokemonList() {
      return this.pokemonList.filter(
        (pokemon: Pokemon) =>
          pokemon.favorite &&
          (!this.search ||
            pokemon.name.toLowerCase().includes(this.search.toLowerCase()))
      );
    },
  },
});
