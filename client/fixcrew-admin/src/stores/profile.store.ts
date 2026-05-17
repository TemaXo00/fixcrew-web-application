import type { ProfileResponse } from '@/types/user/profile.types.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { profileApi } from '@/api/user/profile.api.ts'

export const useProfileStore = defineStore('profile', () => {
  const user = ref<ProfileResponse | null>(null)
  const errorMessage = ref<string>('')
  const errorCode = ref<number | null>(null)
  const isLoading = ref<boolean>(false)

  const clearMessage = () => {
    errorMessage.value = ''
    errorCode.value = null
  }

  const getMe = async () => {
    clearMessage()
    try {
      isLoading.value = true
      user.value = await profileApi.getMe()
    }
    catch (err: any) {
      const apiError = extractApiError(err)
      errorMessage.value = apiError.message
      errorCode.value = apiError.statusCode
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    user,
    errorCode,
    errorMessage,
    isLoading,
    getMe,
  }
})
