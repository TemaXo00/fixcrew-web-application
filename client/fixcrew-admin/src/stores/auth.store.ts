import type {
  AuthLoginType,
  AuthRegister,
  AuthRestoreSendType,
  AuthRestoreType,
} from '@/types/user/auth.types.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api/user/auth.api.ts'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref<string>('')
  const errorCode = ref<number | null>(null)

  const setAccessToken = (token: string) => {
    accessToken.value = token
  }

  const clearAccessToken = () => {
    accessToken.value = null
  }

  const init = async (): Promise<boolean> => {
    if (accessToken.value)
      return true

    try {
      const response = await authApi.refresh()
      accessToken.value = response.access_token
      return true
    }
    catch {
      accessToken.value = null
      return false
    }
  }

  const setError = (message: string, code: number | null = null) => {
    errorMessage.value = message
    errorCode.value = code
  }

  const clearError = () => {
    errorMessage.value = ''
    errorCode.value = null
  }

  const register = async (userData: AuthRegister, token: string) => {
    isLoading.value = true
    clearError()
    try {
      const response = await authApi.register(userData, token)
      setAccessToken(response.access_token)
      return response
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed'
      const code = err.response?.status || null
      setError(message, code)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const login = async (credentials: AuthLoginType) => {
    isLoading.value = true
    clearError()
    try {
      const response = await authApi.login(credentials)
      setAccessToken(response.access_token)
      return response
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Login failed'
      const code = err.response?.status || null
      setError(message, code)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const sendRestore = async (email: AuthRestoreSendType) => {
    isLoading.value = true
    clearError()
    try {
      await authApi.sendRestore(email)
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Failed to send restore email'
      const code = err.response?.status || null
      setError(message, code)
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const restore = async (token: string, password: AuthRestoreType) => {
    isLoading.value = true
    clearError()
    try {
      await authApi.restorePassword(token, password)
    }
    catch (err: any) {
      const message = err.response?.data?.message || 'Password restore failed'
      const code = err.response?.status || null
      setError(message, code)
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
    errorMessage,
    errorCode,
    setAccessToken,
    clearAccessToken,
    init,
    setError,
    clearError,
    register,
    login,
    sendRestore,
    restore,
    logout,
  }
})
