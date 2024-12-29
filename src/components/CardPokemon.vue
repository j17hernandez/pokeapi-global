<script setup lang="ts">
import { defineProps } from "vue";
import type { Pokemon } from "@/interfaces/pokemon.interface.ts";
import Card from "primevue/card";
import FavoriteButton from "@/components/FavoriteButton.vue";

const props = defineProps({
  pokemon: Object as () => Pokemon,
});
</script>

<template>
  <Card class="pokemon-card">
    <template #title>
      <div class="pokemon-card__header">
        <span class="pokemon-card__name">{{ pokemon.name }}</span>
        <FavoriteButton :model-value="pokemon" />
      </div>
    </template>
  </Card>
</template>

<style lang="scss">
@use "@/assets/scss/_variables.scss" as vars;

.pokemon-card {
  height: 60px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    font-size: 22px;
    font-weight: 500;
    color: vars.$color-grey-darker;
    text-transform: capitalize;
  }

  .p-card-body {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    height: 100%;
    gap: 0px;
  }
}
</style>
