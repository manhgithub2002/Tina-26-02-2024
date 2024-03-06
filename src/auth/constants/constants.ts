import { ConfigService } from '@nestjs/config';

export const JwtContants = {
  get access_token_secret_key(): string {
    const configService = new ConfigService();
    return configService.get('ACCESS_TOKEN_SECRET');
  },

  get refresh_token_secret_key(): string {
    const configService = new ConfigService();
    return configService.get('REFRESH_TOKEN_SECRET');
  },

  get refresh_token_cookie_name(): string {
    const configService = new ConfigService();
    return configService.get('REFRESH_TOKEN_COOKIE_NAME');
  },
};
