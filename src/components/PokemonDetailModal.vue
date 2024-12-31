<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Divider from "primevue/divider";
import FavoriteButton from "./FavoriteButton.vue";
import BackgroundIcon from "@/assets/images/Background.svg";
import CloseIcon from "@/assets/images/Close.svg";
import { usePokemonStore } from "@/store/pokemonStore";
import { computed, ref } from "vue";

const pokemonStore = usePokemonStore();

const isVisible = computed(() => pokemonStore.selectedPokemon !== null);

const isCopied = ref(false);

const pokemonImage = computed(() => {
  return pokemonStore.selectedPokemon?.sprites?.other?.["official-artwork"]
    .front_default;
});

const pokemonTypes = computed(() => {
  return pokemonStore.selectedPokemon?.types
    ?.map((type) => type.type.name)
    .join(", ");
});

const sharePokemon = () => {
  isCopied.value = true;
  const infoPokemon = pokemonStore.selectedPokemon;
  const text = `Name: ${infoPokemon?.name},\n Weight: ${infoPokemon?.weight},\n Height: ${infoPokemon?.height},\n Types: ${pokemonTypes.value}`;
  navigator.clipboard.writeText(text);
  setTimeout(() => (isCopied.value = false), 500);
};
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    position="center"
    persistent
    class="pokemon-detail-modal"
    data-testid="pokemon-detail-modal"
  >
    <template #container>
      <div class="pokemon-detail-modal__header">
        <Button
          icon="pi pi-close"
          class="pokemon-detail-modal__header__close-button"
          rounded
          variant="text"
          @click="pokemonStore.selectedPokemon = null"
        >
          <img :src="CloseIcon" alt="close-icon" />
        </Button>
      </div>
      <div
        class="pokemon-detail-modal__image"
        :style="{ backgroundImage: `url(${BackgroundIcon})` }"
      >
        <img :src="pokemonImage" width="180" alt="pokemon" />
      </div>
      <div class="pokemon-detail-modal__content">
        <span class="pokemon-detail-modal__content__key">
          Name:
          <span
            data-testid="modal-pokemon-name"
            class="pokemon-detail-modal__content__value"
            >{{ pokemonStore.selectedPokemon?.name }}</span
          >
        </span>
        <Divider />
        <span class="pokemon-detail-modal__content__key">
          Weight:
          <span
            data-testid="pokemon-weight"
            class="pokemon-detail-modal__content__value"
          >
            {{ pokemonStore.selectedPokemon?.weight }}
          </span>
        </span>
        <Divider />
        <span class="pokemon-detail-modal__content__key">
          Height:
          <span
            data-testid="pokemon-height"
            class="pokemon-detail-modal__content__value"
          >
            {{ pokemonStore.selectedPokemon?.height }}
          </span>
        </span>
        <Divider />
        <span class="pokemon-detail-modal__content__key">
          Types:
          <span
            data-testid="pokemon-types"
            class="pokemon-detail-modal__content__value"
          >
            {{ pokemonTypes }}
          </span>
        </span>
        <Divider />
        <div class="pokemon-detail-modal__content__footer">
          <Button
            data-testid="share-button"
            severity="danger"
            rounded
            @click="sharePokemon"
          >
            Share to my friends {{ isCopied ? "✅" : "" }}
          </Button>
          <FavoriteButton v-model="pokemonStore.selectedPokemon!" disabled />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss">
.pokemon-detail-modal {
  width: 570px !important;
  height: 506px !important;
  box-shadow: none !important;
  border: none !important;

  &__header {
    position: absolute;
    top: 0;
    right: 0;
    &__close-button {
      background-color: transparent !important;
      color: white !important;
      margin: 10px;

      &:hover {
        background-color: transparent !important;
      }
    }
  }

  &__image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    height: 220px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 5px;

    &__key {
      font-size: 18px;
      font-weight: 700;
    }

    &__value {
      font-size: 18px;
      font-weight: 500;
      text-transform: capitalize;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

@media (min-width: 200px) and (max-width: 992px) {
  .pokemon-detail-modal {
    width: 335px !important;
  }
}
</style>
