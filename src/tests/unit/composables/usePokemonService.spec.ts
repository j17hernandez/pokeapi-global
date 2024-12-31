import { vi, describe, it, expect } from "vitest";
import { usePokemonService } from "@/composables/usePokemonService";
import jsonPokemonList from "@/tests/__mocks__/jsonPokemonList";
import jsonPokemonDetail from "@/tests/__mocks__/jsonPokemonDetail";

vi.mock(
  "@/composables/usePokemonService",
  () => import("@/tests/__mocks__/usePokemonService")
);

describe("usePokemonService", () => {
  const { fetchPokemonList, fetchPokemonDetails } = usePokemonService();

  it("should fetch the list of pokemon", async () => {
    const pokemonList = await fetchPokemonList();
    expect(pokemonList).toEqual(jsonPokemonList.results);
  });

  it("should fetch pokemon details", async () => {
    const pokemonDetail = await fetchPokemonDetails("ivysaur");

    expect(pokemonDetail).toEqual({
      ...jsonPokemonDetail,
      fakeName: "ivysaur",
    });
  });
});
