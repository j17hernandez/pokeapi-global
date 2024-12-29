<script setup lang="ts">
import { defineModel } from "vue";
import CardPokemon from "@/components/CardPokemon.vue";
import type { Pokemon } from "@/interfaces/pokemon.interface.ts";

const pokemonList = defineModel<Pokemon[]>();
</script>

<template>
  <div class="pokemon-list">
    <div class="pokemon-list__container">
      <CardPokemon
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
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
}
</style>
