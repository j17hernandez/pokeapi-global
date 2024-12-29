<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { usePokemonStore } from "@/store/pokemonStore";
import SearchIcon from "@/assets/images/Search.svg";
import PokemonList from "@/components/PokemonList.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import FooterTab from "@/components/FooterTab.vue";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { Tabs } from "@/constants/tabs";
const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.fetchPokemonList();
});

const pokemonList = computed(() => pokemonStore.getFilteredPokemonList());
const favoritePokemonList = computed(() =>
  pokemonStore.getFavoritePokemonList()
);

const TabsEnum = Tabs;
const activeTab = ref(Tabs.ALL);
</script>

<template>
  <div class="pokemon-view">
    <LoadingSpinner v-if="pokemonStore.isLoading" />
    <div class="pokemon-view__container" v-else>
      <IconField>
        <InputIcon>
          <img :src="SearchIcon" alt="search-icon" />
        </InputIcon>
        <InputText
          v-model="pokemonStore.search"
          class="pokemon-view__search"
          placeholder="Search"
        />
      </IconField>
      <PokemonList v-show="activeTab === TabsEnum.ALL" v-model="pokemonList" />
      <PokemonList
        v-show="activeTab === TabsEnum.FAVORITES"
        v-model="favoritePokemonList"
      />
    </div>
    <FooterTab v-model="activeTab" />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/_variables.scss" as vars;

.pokemon-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;

  &__container {
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 15px;
    margin-top: 10px;
    height: 84vh;
  }

  &__search {
    width: 100%;
    height: 50px;
  }
}

@media (min-width: 200px) and (max-width: 992px) {
  .pokemon-view {
    &__container {
      width: 100%;
      padding: 20px;
    }
  }
}
</style>
