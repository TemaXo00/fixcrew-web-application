import axios, { type AxiosInstance } from 'axios'

const baseUrl = import.meta.env.VITE_GATEWAY_URL

export const externalApi: AxiosInstance = axios.create({
  timeout: 5000,
})

export const internalApi: AxiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 5000,
})
