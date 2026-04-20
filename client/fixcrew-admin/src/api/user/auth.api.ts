import type {
  AuthLoginType,
  AuthRegister,
  AuthResponseType,
  AuthRestoreSendType,
  AuthRestoreType,
} from '@/types/user/auth.types.ts'
import api from '../configs.api.ts'

export const authApi = {
  async register(userData: AuthRegister, token: string): Promise<AuthResponseType> {
    const { data } = await api.post<AuthResponseType>('/user/auth/register', userData, {
      params: { token },
    })
    return data
  },

  async login(credentials: AuthLoginType): Promise<AuthResponseType> {
    const { data } = await api.post<AuthResponseType>('/user/auth/login', credentials)
    return data
  },

  async sendRestore(email: AuthRestoreSendType): Promise<void> {
    await api.post('/user/tokens/password', email)
  },

  async restorePassword(token: string, password: AuthRestoreType): Promise<void> {
    await api.patch(`/user/auth/restore/${token}`, password)
  },

  async refresh(): Promise<AuthResponseType> {
    const { data } = await api.post<AuthResponseType>('/user/auth/refresh')
    return data
  },

  async logout(): Promise<void> {
    await api.post('/user/auth/logout')
  },
}
