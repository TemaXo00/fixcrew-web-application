import axios, { type AxiosInstance } from 'axios'
import { API_URL } from '@/common/constants.ts'

export const externalApi: AxiosInstance = axios.create({
  timeout: 5000,
})

export const internalApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})
