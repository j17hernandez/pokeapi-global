<script setup lang="ts">
import { onMounted } from "vue";
import { usePokemonService } from "@/composables/usePokemonService.ts";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const { fetchPokemonList, pokemonList, loading } = usePokemonService();

onMounted(() => {
  fetchPokemonList();
});
</script>

<template>
  <div class="pokemon-list">
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <div v-for="pokemon in pokemonList" :key="pokemon.id">
        <p>{{ pokemon.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
