import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PokemonView from "../views/PokemonView.vue";

// Definir las rutas
const routes = [
  { path: "/", component: HomeView },
  { path: "/pokemon", component: PokemonView },
];

// Crear el router
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
