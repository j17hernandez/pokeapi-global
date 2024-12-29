import useAxios from "./useAxios";
import type { Response, PokemonDetail } from "@/interfaces/pokemon.interface";

export function usePokemonService() {
  const { axiosInstance } = useAxios();

  const fetchPokemonList = async () => {
    const response = await axiosInstance.get<Response>("pokemon?limit=50");
    return response.data.results;
  };

  const fetchPokemonDetails = async (name: string) => {
    if (!name) return null;
    const response = await axiosInstance.get<PokemonDetail>(`pokemon/${name}`);
    return response.data;
  };

  return { fetchPokemonList, fetchPokemonDetails };
}
