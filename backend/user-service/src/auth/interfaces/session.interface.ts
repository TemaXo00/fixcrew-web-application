export interface Session {
  id: string;
  userId: string;
  deviceId: string;
  refreshTokenHash: string;
  createdAt: number;
  expiresAt: number;
}