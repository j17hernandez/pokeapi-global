<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Pokemon } from "@/interfaces/pokemon.interface.ts";
import Card from "primevue/card";
import FavoriteButton from "@/components/FavoriteButton.vue";

const props = defineProps({
  pokemon: Object as () => Pokemon,
});

const emit = defineEmits(["openModal"]);

const emitEvent = (pokemon: Pokemon) => {
  emit("openModal", pokemon);
};
</script>

<template>
  <Card class="pokemon-card">
    <template #title>
      <div class="pokemon-card__header">
        <span
          data-testid="pokemon-name"
          class="pokemon-card__name"
          @click="emitEvent(props?.pokemon!)"
          >{{ props?.pokemon?.name }}</span
        >
        <FavoriteButton v-model="props.pokemon" />
      </div>
    </template>
  </Card>
</template>

<style lang="scss">
@use "@/assets/scss/_variables.scss" as vars;

.pokemon-card {
  height: 60px;
  background-color: vars.$background-card !important;
  border-radius: 5px !important;

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
    cursor: pointer;
    width: 100%;
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
