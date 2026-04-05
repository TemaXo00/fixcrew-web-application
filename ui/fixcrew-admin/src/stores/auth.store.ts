import type { AuthLoginType, AuthRegister, AuthRestoreSendType, AuthRestoreType } from '@/types/auth.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api/user/auth.api.ts'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setAccessToken = (token: string) => {
    accessToken.value = token
    localStorage.setItem('token', accessToken.value)
  }

  const clearAccessToken = () => {
    accessToken.value = null
    localStorage.removeItem('token')
  }

  const setError = (message: string | null) => {
    error.value = message
  }

  const register = async (userData: AuthRegister, token: string) => {
    isLoading.value = true
    setError(null)
    try {
      const response = await authApi.register(userData, token)
      setAccessToken(response.access_token)
      return response
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed'
      setError(message)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const login = async (credentials: AuthLoginType) => {
    isLoading.value = true
    setError(null)
    try {
      const response = await authApi.login(credentials)
      setAccessToken(response.access_token)
      return response
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const sendRestore = async (email: AuthRestoreSendType) => {
    isLoading.value = true
    setError(null)
    try {
      await authApi.sendRestore(email)
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Failed to send restore email'
      setError(message)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const restore = async (token: string, password: AuthRestoreType) => {
    isLoading.value = true
    setError(null)
    try {
      await authApi.restorePassword(token, password)
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Password restore failed'
      setError(message)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await authApi.logout()
    }
    catch {
    }
    finally {
      clearAccessToken()
      isLoading.value = false
    }
  }

  return {
    accessToken,
    isLoading,
    error,
    setAccessToken,
    clearAccessToken,
    setError,
    register,
    login,
    sendRestore,
    restore,
    logout,
  }
})
