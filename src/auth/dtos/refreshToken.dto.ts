import { Payload } from '../strategies/accessToken.startegy';

export class RefreshTokenDto {
  payload: Payload;

  tokenVersion: number;
}
