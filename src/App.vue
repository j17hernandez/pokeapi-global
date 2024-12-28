<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/_variables.scss" as vars;

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: vars.$background-color;
}
</style>
