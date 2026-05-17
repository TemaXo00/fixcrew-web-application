import type { ProfileResponse } from '@/types/user/profile.types.ts'
import api from '@/api/configs.api.ts'

export const profileApi = {
  async getMe(): Promise<ProfileResponse> {
    const { data } = await api.get<ProfileResponse>('/user/profile/me')
    return data
  },
}
