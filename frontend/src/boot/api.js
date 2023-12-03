import axios from "axios";
import { useAuthStore } from "@/stores/auth";
const env = import.meta.env;

const api = axios.create({
  baseURL: `${env.VITE_API_URL}`,
  headers: {
    "x-accept-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Do something with response error
    if (
      [401].includes(error.response.status) &&
      localStorage.getItem("token")
    ) {
      //console.log("axios.interceptors.error: useRouter===>", error);
      localStorage.clear();
      const auth = useAuthStore();
      auth.$reset();
      window.location.replace(`/login`);
    }
    return Promise.reject(error);
  }
);

if (localStorage.getItem("token")) {
  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;
}

export const setAPItoken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
