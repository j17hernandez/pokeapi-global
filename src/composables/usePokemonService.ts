import { useQuery } from "@tanstack/vue-query";
import useAxios from "./useAxios";
import type { Response, PokemonDetail } from "@/interfaces/pokemon.interface";

export function usePokemonService() {
  const { axiosInstance } = useAxios();

  const fetchPokemonList = async () => {
    const response = await axiosInstance.get<Response>("pokemon?limit=50");
    return response.data.results;
  };

  const pokemonListQuery = useQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemonList,
    staleTime: 1000 * 60 * 5, // Guarda en caché los datos durante 5 minutos
    retry: 2, // Intenta la consulta 2 veces antes de fallar
  });

  const fetchPokemonDetails = async (name: string) => {
    const response = await axiosInstance.get<PokemonDetail>(`pokemon/${name}`);
    return response.data;
  };

  const getPokemonDetails = (name: string) =>
    useQuery({
      queryKey: ["pokemonDetails", name], // Clave única para esta consulta
      queryFn: () => fetchPokemonDetails(name), // Función para obtener los detalles
      enabled: !!name, // Solo ejecuta la consulta si `name` tiene un valor
    });

  return { pokemonListQuery, getPokemonDetails };
}
