<script setup lang="ts">
import { Tabs } from "@/constants/tabs";
import { defineModel } from "vue";
import ListIcon from "@/assets/images/List.svg";
import StarIcon from "@/assets/images/Star.svg";
import Button from "primevue/button";

const activeTab = defineModel<Tabs>();
const TabsEnum = Tabs;
</script>

<template>
  <footer class="footer-tab">
    <Button
      class="footer-tab___button"
      :class="{
        'footer-tab___button---active': activeTab === TabsEnum.ALL,
      }"
      rounded
      @click="activeTab = TabsEnum.ALL"
    >
      <img :src="ListIcon" alt="list-icon" />
      <span class="footer-tab___button___text">All</span>
    </Button>
    <Button
      class="footer-tab___button"
      :class="{
        'footer-tab___button---active': activeTab === TabsEnum.FAVORITES,
      }"
      rounded
      @click="activeTab = TabsEnum.FAVORITES"
    >
      <img :src="StarIcon" alt="star-icon" class="icon-white" />
      <span class="footer-tab___button___text">Favorites</span>
    </Button>
  </footer>
</template>

<style lang="scss">
@use "@/assets/scss/_variables.scss" as vars;

.footer-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  box-shadow: 0px -5px 4px 0px #0000000d;

  &___button {
    margin: 0 10px;
    height: 44px;
    width: 275px;
    background-color: vars.$color-grey-base !important;
    border-color: vars.$color-grey-base !important;

    &:active {
      background-color: vars.$color-grey-dark !important;
    }

    &---active {
      background-color: vars.$color-red-base !important;
      border-color: vars.$color-red-base !important;
      &:active {
        background-color: vars.$color-red-dark !important;
      }
    }

    &___text {
      font-size: 18px;
      font-weight: 700;
    }
  }
}

.icon-white {
  filter: brightness(0) saturate(100%) invert(87%) sepia(0%) saturate(2473%)
    hue-rotate(328deg) brightness(114%) contrast(114%);
}
</style>
