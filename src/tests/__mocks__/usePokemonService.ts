import jsonPokemonList from "./jsonPokemonList";
import jsonPokemonDetail from "./jsonPokemonDetail";
import { vi } from "vitest";

export const usePokemonService = vi.fn(() => {
  const fetchPokemonList = vi.fn(async () => {
    return Promise.resolve(jsonPokemonList.results);
  });

  const fetchPokemonDetails = vi.fn(async (name: string) => {
    return Promise.resolve({
      ...jsonPokemonDetail,
      fakeName: name,
    });
  });

  return { fetchPokemonList, fetchPokemonDetails };
});
