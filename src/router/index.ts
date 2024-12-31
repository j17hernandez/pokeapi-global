import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PokemonView from "../views/PokemonView.vue";

// Definir las rutas
const routes = [
  { path: "/", component: HomeView, name: "Home" },
  { path: "/pokemon", component: PokemonView, name: "Pokemon" },
];

// Crear el router
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
