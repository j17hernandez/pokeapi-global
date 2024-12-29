import axios from "axios";

const useAxios = () => {
  // Crear una instancia de Axios con una configuración base
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000, // Tiempo de espera de 10 segundos
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { axiosInstance };
};

export default useAxios;
