export interface AuthRegister {
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password: string;
  avatar_url: File | null;
}

export type AuthLogin = Pick<AuthRegister, 'email' | 'password'>

export type AuthRestore = Pick<AuthRegister, 'password'>

export type AuthRestoreSend = Pick<AuthRegister, 'email'>
