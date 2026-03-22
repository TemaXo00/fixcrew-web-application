export interface UserRegister {
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password: string;
  avatar_url: File | null;
}

export type UserLogin = Pick<UserRegister, 'email' | 'password'>
