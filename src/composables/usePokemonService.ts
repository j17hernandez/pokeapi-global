import { ref } from "vue";
import useAxios from "./useAxios";

export function usePokemonService() {
  const { axiosInstance } = useAxios();
  const pokemonList = ref([]);
  const loading = ref(false);
  const error = ref("");

  const fetchPokemonList = async () => {
    loading.value = true;
    try {
      const response = await axiosInstance.get("pokemon?limit=50");
      pokemonList.value = response.data.results;
    } catch (err) {
      error.value = "Error fetching Pokémon data";
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  };

  const fetchPokemonDetails = async (name: string) => {
    try {
      const response = await axiosInstance.get(`pokemon/${name}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching Pokémon details:", err);
    }
  };

  return { pokemonList, loading, error, fetchPokemonList, fetchPokemonDetails };
}
