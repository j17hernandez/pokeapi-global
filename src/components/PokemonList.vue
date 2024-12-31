<script setup lang="ts">
import { defineModel } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "@/store/pokemonStore";
import type { Pokemon } from "@/interfaces/pokemon.interface.ts";
import { usePokemonService } from "@/composables/usePokemonService";
import Button from "primevue/button";
import CardPokemon from "@/components/CardPokemon.vue";
import PokemonDetailModal from "@/components/PokemonDetailModal.vue";

const pokemonList = defineModel<Pokemon[]>({ default: [] });
const router = useRouter();
const pokemonStore = usePokemonStore();
const { fetchPokemonDetails } = usePokemonService();

const openModal = async (pokemon: Pokemon) => {
  try {
    pokemonStore.setLoading(true);
    const data = await fetchPokemonDetails(pokemon.name);
    if (data) {
      pokemonStore.setSelectedPokemon({ ...data, favorite: pokemon.favorite });
    }
  } catch (error: any) {
    console.error("Error fetching Pokémon details:", error.message);
  } finally {
    setTimeout(() => pokemonStore.setLoading(false), 500);
  }
};

const goToHomeView = () => {
  pokemonStore.search = "";
  router.push("/");
};
</script>

<template>
  <div class="pokemon-list">
    <div v-if="pokemonList.length > 0" class="pokemon-list__container">
      <CardPokemon
        v-for="(pokemon, index) in pokemonList"
        :key="index"
        :pokemon="pokemon"
        @openModal="openModal"
      />
      <PokemonDetailModal
        v-if="!pokemonStore.isLoading && pokemonStore.selectedPokemon"
      />
    </div>
    <div v-else class="pokemon-list__no-results">
      <span class="pokemon-list__no-results__title">Uh-oh!</span>
      <span class="pokemon-list__no-results__text"
        >You look lost on your journey!</span
      >
      <Button severity="danger" rounded @click="goToHomeView">
        Go back home
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/_variables.scss" as vars;

.pokemon-list {
  width: 100%;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: vars.$color-grey-base vars.$color-grey-lighter;

  &::-webkit-scrollbar {
    width: 5px !important;
    height: 5px !important;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: vars.$color-grey-light;
    border-radius: 15px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__no-results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;

    &__title {
      font-size: 36px;
      font-weight: 700;
      line-height: 43.2px;
      color: vars.$color-grey-darker;
    }

    &__text {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      color: vars.$color-grey-dark;
    }
  }
}
</style>
