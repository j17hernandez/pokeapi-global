import jsonPokemonList from "./jsonPokemonList";
import jsonPokemonDetail from "./jsonPokemonDetail";

export function usePokemonService() {
  const fetchPokemonList = async () => {
    return Promise.resolve(jsonPokemonList.results);
  };

  const fetchPokemonDetails = async (name: string) => {
    return Promise.resolve({
      ...jsonPokemonDetail,
      fakeName: name,
    });
  };

  return { fetchPokemonList, fetchPokemonDetails };
}
