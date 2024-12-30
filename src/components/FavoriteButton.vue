<script setup lang="ts">
import { defineModel, defineProps } from "vue";
import Button from "primevue/button";
import StarIcon from "@/assets/images/Star.svg";
import type { Pokemon, PokemonDetail } from "@/interfaces/pokemon.interface.ts";

const pokemon = defineModel<Pokemon | PokemonDetail>();

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Button
    class="favorite-button"
    rounded
    data-testid="favorite-button"
    variant="outlined"
    icon="pi pi-star"
    @click="
      props.disabled || !pokemon ? null : (pokemon.favorite = !pokemon.favorite)
    "
  >
    <img
      class="favorite-button__icon"
      data-testid="favorite-icon"
      :class="{
        'favorite-button__icon---active': pokemon?.favorite,
      }"
      :src="StarIcon"
      alt="Star icon"
    />
  </Button>
</template>

<style lang="scss">
@use "@/assets/scss/_variables.scss" as vars;

.favorite-button {
  border-color: vars.$color-grey-base !important;
  background-color: vars.$color-grey-light !important;

  &__icon {
    &---active {
      filter: brightness(0) saturate(100%) invert(68%) sepia(24%)
        saturate(1242%) hue-rotate(355deg) brightness(99%) contrast(88%);
    }
  }
}
</style>
