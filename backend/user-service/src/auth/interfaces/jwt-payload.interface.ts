import { Roles } from '../enums/roles.enum';

export interface JwtPayload {
  sub: string;
  sessionId: string;
  role: Roles;
  type: 'access_token' | 'refresh_token';
}