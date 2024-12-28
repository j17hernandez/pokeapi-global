import { createApp } from "vue";
import "@/assets/scss/main.scss";
import App from "./App.vue";
import router from "./router/";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");