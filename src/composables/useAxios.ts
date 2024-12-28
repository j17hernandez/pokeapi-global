import axios from 'axios';

const useAxios = () => {
  // Crear una instancia de Axios con una configuración base
  const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/', // URL base de la API de Pokémon
    timeout: 10000, // Tiempo de espera de 10 segundos
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { axiosInstance };
};

export default useAxios;
