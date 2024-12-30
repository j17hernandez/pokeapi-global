# Pokeapi Global

Esta es una aplicación sencilla desarrollada en Vue 3 que permite a los usuarios ver una lista de Pokémons obtenida desde la PokeAPI, agregar sus favoritos a una lista y compartir sus datos al portapapeles.

---

## **Índice**

1. [Tecnologías Utilizadas](#tecnologías-utilizadas)
2. [Características](#características)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Decisiones Técnicas](#decisiones-técnicas)
7. [Pruebas](#pruebas)
8. [Mejoras Futuras](#mejoras-futuras)

---

## **Tecnologías Utilizadas**

- **Framework**: Vue.js 3
- **Lenguaje:** TypeScript
- **Administración del Estado**: Pinia
- **Estilos**: SASS
- **Peticiones HTTP**: Axios
- **Testing**: Vitest, Testing library

---

## **Características**

1. **Lista de Pokémons:**

   - Obtiene una lista de Pokémons de la PokeAPI.
   - Permite agregar y quitar Pokémons favoritos.

2. **Lista de Favoritos:**

   - Permite agregar y quitar Pokémons favoritos.
   - Los favoritos se persisten en el estado global utilizando Pinia.

3. **Compartir Pokémon:**

   - Copia los datos del Pokémon seleccionado (nombre y atributos) al portapapeles.

4. **Pantalla de Carga:**
   - Una animación de pokebola aparece mientras se cargan los datos.

---

## **Estructura del Proyecto**

```plaintext
src/
├── App.vue
├── main.ts
├── vite-env.d.ts
├── assets/
│   ├── images/
│   │   ├── Background.svg
│   │   ├── Close.svg
│   │   ├── List.svg
│   │   ├── Loader.svg
│   │   ├── Pikachu.svg
│   │   ├── Search.svg
│   │   └── Star.svg
│   ├── scss/
│       ├── main.scss
│       └── _variables.scss
├── components/
│   ├── CardPokemon.vue
│   ├── FavoriteButton.vue
│   ├── FooterTab.vue
│   ├── LoadingSpinner.vue
│   ├── PokemonDetailModal.vue
│   └── PokemonList.vue
├── composables/
│   ├── useAxios.ts
│   └── usePokemonService.ts
├── constants/
│   └── tabs.ts
├── interfaces/
│   └── pokemon.interface.ts
├── router/
│   └── index.ts
├── store/
│   └── pokemonStore.ts
└── views/
    ├── HomeView.vue
    └── PokemonView.vue
```

---

## **Instalación**

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/j17hernandez/pokeapi-global.git
   cd pokeapi-global
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Accede a la aplicación en tu navegador en:

   ```bash
   http://localhost:5173
   ```

---

## **Uso**

- **Visualiza la lista de Pokémons:** Navega por los Pokémons disponibles.
- **Agrega Pokémons a favoritos:** Haz clic en el icono de estrella en cualquier Pokémon.
- **Ver el detalle de un pokemon:** Haz clic en el nombre de cualquier Pokémon ya sea en la lista de "All" o "Favorites".
- **Comparte un Pokémon:** Estando en la vista del detalle haz clic en "Share to my friends" para copiar el nombre y atributos del Pokémon al portapapeles.

---

## **Decisiones Técnicas**

### **1. Arquitectura del Código**

- **Componentización:**
  - Los componentes están diseñados para ser reutilizables y mantener el principio de responsabilidad única.
- **Composables:**
  - `usePokemonService.ts` para manejar llamadas a la API.
  - `useAxios.ts` para definir una instancia única de Axios.

### **2. Manejo del Estado Global**

- Utilicé Pinia para guardar el listado de Pokemons y retornar los Pokemons favoritos, ya que es más moderno y ligero que Vuex.

### **3. Animaciones y Estilos**

- La animación de carga usa CSS puro para simplicidad y compatibilidad.

---

## **Pruebas**

### **1. Unit Tests**

- Se implementaron pruebas unitarias para:
  - Validar las funciones de los composables.
  - Verificar el comportamiento de los componentes principales.

---

## **Mejoras Futuras**

1. **Paginación:** Implementar paginación para manejar grandes volúmenes de datos.
2. **Internacionalización:** Agregar soporte para múltiples idiomas.

---

Gracias por revisar esta aplicación. Si tienes algún comentario o sugerencia, no dudes en comunicarte. ¡Disfruta explorando Pokémons!
