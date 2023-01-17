import axios from "axios";
import { QueryClient } from "react-query";
import { setting } from "../lib/settings";

// Connect API
export const AxiosClient = axios.create({
  baseURL: setting.uri + "/api/v1"
})

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})