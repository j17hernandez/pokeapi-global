import { render, fireEvent, waitFor, cleanup } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { usePokemonStore } from "@/store/pokemonStore";
import PrimeVue from "primevue/config";
import PokemonView from "@/views/PokemonView.vue";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import { usePokemonService } from "@/composables/usePokemonService";
import { createRouter, createWebHistory } from "vue-router";
import jsonPokemonDetail from "@/tests/__mocks__/jsonPokemonDetail";

vi.mock(
  "@/composables/usePokemonService",
  () => import("@/tests/__mocks__/usePokemonService")
);

describe("Testing PokemonView.vue", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn(() => Promise.resolve()),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    cleanup();
  });

  const configTest = (component: any) => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/pokemon",
          name: "Pokemon",
          component: component,
        },
        {
          path: "/",
          redirect: "/pokemon",
        },
      ],
    });
    const renderView = render(component, {
      global: {
        plugins: [
          PrimeVue,
          router,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              pokemonList: [],
              selectedPokemon: null,
              isLoading: false,
              search: "",
            },
            stubActions: false,
          }),
        ],
      },
    });
    return renderView;
  };

  it("Test renders pokemon view", async () => {
    const { findByTestId } = configTest(PokemonView);
    const pokemonStore = usePokemonStore();
    pokemonStore.setLoading(false);

    await waitFor(() => {
      expect(pokemonStore.isLoading).toBe(false);
      expect(pokemonStore.pokemonList).toHaveLength(2);
    });

    const pokemonView = await findByTestId("pokemon-view");

    expect(pokemonView).toBeDefined();
  });

  it("Test search a pokemon", async () => {
    const { findByTestId } = configTest(PokemonView);
    const pokemonStore = usePokemonStore();
    pokemonStore.setLoading(false);

    await waitFor(() => {
      expect(pokemonStore.isLoading).toBe(false);
      expect(pokemonStore.pokemonList).toHaveLength(2);
    });

    const searchInput = await findByTestId("search-input");
    const pokemonToSearch = "bulbasaur";
    await fireEvent.update(searchInput, pokemonToSearch);

    expect((searchInput as HTMLInputElement).value).toBe(pokemonToSearch);
  });

  it("Testing PokemonDetailModal.vue", async () => {
    const { findAllByTestId, findByTestId } = configTest(PokemonView);
    const pokemonStore = usePokemonStore();
    pokemonStore.setLoading(false);

    await waitFor(() => {
      expect(pokemonStore.pokemonList).toHaveLength(2);
      expect(pokemonStore.isLoading).toBe(false);
    });

    const pokemonNames = await findAllByTestId("pokemon-name");

    expect(pokemonNames).toHaveLength(2);

    await waitFor(() => {
      fireEvent.click(pokemonNames[1]);
      pokemonStore.setLoading(false);
    });
    const { fetchPokemonDetails } = usePokemonService();
    const data = await fetchPokemonDetails(jsonPokemonDetail.name);
    if (data) {
      pokemonStore.setSelectedPokemon(data);
    }

    const modal = await findByTestId("pokemon-detail-modal");
    expect(modal).toBeDefined();

    const pokemonName = await findByTestId("modal-pokemon-name");
    expect(pokemonName.textContent).toBe(jsonPokemonDetail.name);

    const pokemonWeight = await findByTestId("pokemon-weight");
    expect(pokemonWeight.textContent).toBe(String(jsonPokemonDetail.weight));

    const pokemonHeight = await findByTestId("pokemon-height");
    expect(pokemonHeight.textContent).toBe(String(jsonPokemonDetail.height));

    const pokemonTypes = await findByTestId("pokemon-types");
    const pokemonTypesValue = jsonPokemonDetail.types
      .map((type) => type.type.name)
      .join(", ");
    expect(pokemonTypes.textContent).toBe(pokemonTypesValue);

    const shareButton = await findByTestId("share-button");

    await waitFor(() => {
      fireEvent.click(shareButton);
    });

    const infoPokemon = pokemonStore.selectedPokemon;
    const text = `Name: ${infoPokemon?.name},\n Weight: ${infoPokemon?.weight},\n Height: ${infoPokemon?.height},\n Types: ${pokemonTypesValue}`;

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it("Change to favorites tab", async () => {
    const { findAllByTestId, findByTestId } = configTest(PokemonView);
    const pokemonStore = usePokemonStore();
    pokemonStore.setLoading(false);

    await waitFor(() => {
      expect(pokemonStore.pokemonList).toHaveLength(2);
      expect(pokemonStore.isLoading).toBe(false);
    });

    const buttons = await findAllByTestId("favorite-button");
    await waitFor(() => {
      fireEvent.click(buttons[0]);
    });
    expect(buttons[0]).toBeTruthy();

    const icons = await findAllByTestId("favorite-icon");
    expect(icons[0].className).toContain("--active");
    expect(pokemonStore.pokemonList[0].favorite).toBe(true);

    const favoriteButton = await findByTestId("favorite-button-tab");

    await waitFor(() => {
      fireEvent.click(favoriteButton);
    });

    expect(pokemonStore.getFavoritePokemonList).toHaveLength(1);
  });
});
