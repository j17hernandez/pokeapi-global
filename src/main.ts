import { createApp } from "vue";
import "@/assets/scss/main.scss";
import App from "./App.vue";
import router from "./router/";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
