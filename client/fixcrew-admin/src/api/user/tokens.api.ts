import type { PaginatedResponse } from '@/types/shared/pagination.types.ts'
import type { InviteSendType, Token, TokenRevokeType, TokensStats } from '@/types/user/token.types.ts'
import api from '@/api/configs.api.ts'

export const tokenApi = {
  async getTokens(params?: { page?: number, limit?: number }): Promise<PaginatedResponse<Token>> {
    const { data } = await api.get<PaginatedResponse<Token>>('/user/tokens', { params })
    return data
  },

  async getTokenStats(): Promise<TokensStats> {
    const { data } = await api.get<TokensStats>('/user/tokens/stats')
    return data
  },

  async createInviteToken(dto: InviteSendType): Promise<Token> {
    const { data } = await api.post<Token>('/user/tokens/invite', dto)
    return data
  },

  async revokeToken(dto: TokenRevokeType): Promise<Token> {
    const { data } = await api.put<Token>(`/user/tokens/${dto.id}`, dto)
    return data
  },

  async removeTokens(): Promise<void> {
    await api.delete('/user/tokens')
  },
}
