import axios from "axios";
import { env } from "@/env";

export const axiosInstance = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: env.VIA_CEP_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
