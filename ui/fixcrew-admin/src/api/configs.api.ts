import type { AxiosInstance } from 'axios'
import axios from 'axios'

export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL

export const userRoutes: AxiosInstance = axios.create({
  baseURL: `${GATEWAY_URL}/user`,
  timeout: 5000,
  withCredentials: true,
})
