export interface Token {
  id: string
  email: string
  status: string
  type: string
  expires_at: string
}

export interface TokensStats {
  all: number
  created: number
  used: number
  revoked: number
  expired: number
}

export type InviteSendType = Pick<Token, 'email'>

export type TokenRevokeType = Pick<Token, 'id'>
