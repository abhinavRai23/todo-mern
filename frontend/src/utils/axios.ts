import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "";
console.log(BASE_URL);
export const api = axios.create({
  baseURL: BASE_URL + "/api",
});

export default api;
