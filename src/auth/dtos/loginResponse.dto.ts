import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class LoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  user: User;
}
