import { defineStore } from "pinia";
import { usePokemonService } from "@/composables/usePokemonService";
import type { Pokemon, PokemonDetail } from "@/interfaces/pokemon.interface";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [] as Pokemon[],
    selectedPokemon: null as PokemonDetail | null,
    isLoading: false,
    search: "",
  }),

  actions: {
    async fetchPokemonList() {
      const { pokemonListQuery } = usePokemonService();
      try {
        this.isLoading = true;
        const data = await pokemonListQuery.refetch();
        this.pokemonList =
          data.data?.map((pokemon: Pokemon) => ({
            ...pokemon,
            favorite: false,
          })) || [];
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setTimeout(() => (this.isLoading = false), 500);
      }
    },

    async fetchPokemonDetails(name: string) {
      const { getPokemonDetails } = usePokemonService();
      try {
        this.isLoading = true;
        const { data } = await getPokemonDetails(name).refetch();
        this.selectedPokemon = data ?? null;
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setTimeout(() => (this.isLoading = false), 500);
      }
    },

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
