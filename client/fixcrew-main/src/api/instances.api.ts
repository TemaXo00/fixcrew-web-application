import axios, { type AxiosInstance } from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export const externalApi: AxiosInstance = axios.create({
  timeout: 5000,
})

export const internalApi: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})
