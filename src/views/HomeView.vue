<script setup lang="ts">
import PikachuIcon from "@/assets/images/Pikachu.svg";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const router = useRouter();

const goToPokemonView = () => {
  router.push("/pokemon");
};
</script>

<template>
  <div class="home-view">
    <img :src="PikachuIcon" alt="Pikachu" class="pikachu-icon" />
    <h1 class="home-view__title">Welcome to Pokédex</h1>
    <span class="home-view__description">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </span>
    <Button severity="danger" class="button" rounded @click="goToPokemonView">
      Get started
    </Button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/_variables.scss" as vars;

.home-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 570px;
  height: 100vh;

  &__title {
    font-size: 26px;
    font-weight: 700;
    line-height: 31.2px;
    color: vars.$color-grey-darker;
  }

  &__description {
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    text-align: center;
    color: vars.$color-grey-dark;
  }

  .button {
    --p-button-danger-background: var(vars.$color-red-base);
  }
}
</style>
