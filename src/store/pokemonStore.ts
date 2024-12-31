import { defineStore } from "pinia";
import type { Pokemon, PokemonDetail } from "@/interfaces/pokemon.interface";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [] as Pokemon[],
    selectedPokemon: null as PokemonDetail | null,
    isLoading: false,
    search: "",
  }),

  getters: {
    getFilteredPokemonList: (state) => {
      if (!state.search) return state.pokemonList;
      return state.pokemonList.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(state.search.toLowerCase())
      );
    },
    getFavoritePokemonList: (state) => {
      return state.pokemonList.filter(
        (pokemon: Pokemon) =>
          pokemon.favorite &&
          (!state.search ||
            pokemon.name.toLowerCase().includes(state.search.toLowerCase()))
      );
    },
  },

  actions: {
    setPokemonList(pokemonList: Pokemon[]) {
      this.pokemonList = pokemonList;
    },
    setSelectedPokemon(selectedPokemon: PokemonDetail) {
      this.selectedPokemon = selectedPokemon;
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});
