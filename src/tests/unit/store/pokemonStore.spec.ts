import { setActivePinia, createPinia } from "pinia";
import { usePokemonStore } from "@/store/pokemonStore";
import { describe, it, expect, beforeEach } from "vitest";
import jsonPokemonList from "@/tests/__mocks__/jsonPokemonList";
import jsonPokemonDetail from "@/tests/__mocks__/jsonPokemonDetail";

describe("Testing pokemonStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Estado inicial del store", () => {
    const pokemonStore = usePokemonStore();

    expect(pokemonStore.pokemonList).toEqual([]);
    expect(pokemonStore.selectedPokemon).toBeNull();
    expect(pokemonStore.isLoading).toBe(false);
    expect(pokemonStore.search).toBe("");
  });

  it("Getter getFilteredPokemonList sin filtro", () => {
    const pokemonStore = usePokemonStore();

    pokemonStore.setPokemonList(jsonPokemonList.results);

    expect(pokemonStore.getFilteredPokemonList).toEqual(
      pokemonStore.pokemonList
    );
  });

  it("Getter getFilteredPokemonList con filtro", () => {
    const pokemonStore = usePokemonStore();

    pokemonStore.setPokemonList(jsonPokemonList.results);
    pokemonStore.search = "bulbasaur";

    expect(pokemonStore.getFilteredPokemonList).toEqual([
      jsonPokemonList.results[0],
    ]);
  });

  it("Getter getFavoritePokemonList sin filtro", () => {
    const pokemonStore = usePokemonStore();

    pokemonStore.setPokemonList(
      jsonPokemonList.results.map((pokemon) => {
        return {
          ...pokemon,
          favorite: true,
        };
      })
    );

    expect(pokemonStore.getFavoritePokemonList).toEqual([
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
        favorite: true,
      },
      {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/",
        favorite: true,
      },
    ]);
  });

  it("Getter getFavoritePokemonList con filtro", () => {
    const pokemonStore = usePokemonStore();

    pokemonStore.setPokemonList(
      jsonPokemonList.results.map((pokemon) => {
        return {
          ...pokemon,
          favorite: true,
        };
      })
    );
    pokemonStore.search = "bulbasaur";

    expect(pokemonStore.getFavoritePokemonList).toEqual([
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
        favorite: true,
      },
    ]);
  });

  it("Acción setPokemonList", () => {
    const pokemonStore = usePokemonStore();

    pokemonStore.setPokemonList(jsonPokemonList.results);

    expect(pokemonStore.pokemonList).toEqual(jsonPokemonList.results);
  });

  it("Acción setSelectedPokemon", () => {
    const pokemonStore = usePokemonStore();

    pokemonStore.setSelectedPokemon(jsonPokemonDetail);

    expect(pokemonStore.selectedPokemon).toEqual(jsonPokemonDetail);
    expect(pokemonStore.selectedPokemon?.name).toBe(jsonPokemonDetail.name);
  });

  it("Acción setLoading", () => {
    const pokemonStore = usePokemonStore();

    pokemonStore.setLoading(true);

    expect(pokemonStore.isLoading).toBe(true);

    pokemonStore.setLoading(false);

    expect(pokemonStore.isLoading).toBe(false);
  });
});
