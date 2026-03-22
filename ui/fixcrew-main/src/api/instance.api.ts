import axios, { type AxiosInstance } from 'axios'

export const instanceApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
  timeout: 5000,
})
