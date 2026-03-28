import axios, { type AxiosInstance } from 'axios'

const baseUrl = import.meta.env.VITE_GATEWAY_URL

export const externalApi: AxiosInstance = axios.create({
  timeout: 5000,
})

export const userApi: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/user`,
  timeout: 5000,
})
