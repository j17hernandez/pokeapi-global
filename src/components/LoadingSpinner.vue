<script lang="ts" setup>
import Loader from "@/assets/images/loader.svg";
</script>

<template>
  <div class="loading-spinner">
    <img :src="Loader" alt="loading..." class="spinner" />
  </div>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 12;
  -webkit-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
</style>
