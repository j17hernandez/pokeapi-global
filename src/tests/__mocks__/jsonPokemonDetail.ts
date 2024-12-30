export default {
  height: 10,
  id: 2,
  name: "ivysaur",
  sprites: {
    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/2.png",
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
    {
      slot: 2,
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    },
  ],
  weight: 130,
};
