export interface AuthRegister {
  name: string
  surname: string
  phone_number: string
  email: string
  password: string
  avatar_url: File | null
}

export type AuthLoginType = Pick<AuthRegister, 'email' | 'password'>

export type AuthRestoreType = Pick<AuthRegister, 'password'>

export type AuthRestoreSendType = Pick<AuthRegister, 'email'>
