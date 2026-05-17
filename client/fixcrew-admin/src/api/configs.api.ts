import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { authApi } from '@/api/user/auth.api.ts'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'

const apiUrl = import.meta.env.VITE_API_URL

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    }
    else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authStore = useAuthStore()
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const authStore = useAuthStore()

    const isAuthEndpoint = originalRequest.url?.includes('/auth/')

    if (isAuthEndpoint) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const data = await authApi.refresh()
        authStore.setAccessToken(data.access_token)
        processQueue(null, data.access_token)
        return api(originalRequest)
      }
      catch (refreshError) {
        processQueue(refreshError as Error, null)
        authStore.clearAccessToken()
        if (!window.location.pathname.includes('/auth/')) {
          await router.push('/auth/login')
        }
        return Promise.reject(refreshError)
      }
      finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
