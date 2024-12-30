import { render, fireEvent, waitFor, cleanup } from "@testing-library/vue";
import PrimeVue from "primevue/config";
import CardPokemon from "@/components/CardPokemon.vue";
import { describe, it, expect, afterEach } from "vitest";

describe("CardPokemon.vue", () => {
  afterEach(() => {
    cleanup();
  });
  const pokemon = {
    name: "Pikachu",
    url: "https://example.com/pikachu",
    favorite: false,
  };

  const configTest = (component: any) => {
    const renderView = render(component, {
      global: {
        plugins: [PrimeVue],
      },
      props: {
        pokemon: pokemon,
      },
    });
    return renderView;
  };

  it("Renders pokemon name", async () => {
    const { findByTestId } = configTest(CardPokemon);
    const pokemonName = await findByTestId("pokemon-name");
    expect(pokemonName.textContent).toBe("Pikachu");
  });

  it("Emits openModal event when pokemon name is clicked", async () => {
    const { findByTestId, emitted } = configTest(CardPokemon);
    const pokemonName = await findByTestId("pokemon-name");

    await waitFor(() => {
      fireEvent.click(pokemonName);
    });

    expect(emitted().openModal).toBeTruthy();
    expect(emitted().openModal[0]).toEqual([pokemon]);
  });

  it("Change state when pokemon favorite", async () => {
    const { findByTestId } = configTest(CardPokemon);
    const button = await findByTestId("favorite-button");
    await waitFor(() => {
      fireEvent.click(button);
    });
    expect(button).toBeTruthy();

    const icon = await findByTestId("favorite-icon");
    expect(icon.className).toContain("--active");
    expect(pokemon.favorite).toBe(true);
  });
});
