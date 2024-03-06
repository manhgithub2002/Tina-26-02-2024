import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @Length(8, 20)
  oldPassword: string;

  @ApiProperty()
  @Length(8, 20)
  newPassword: string;
}
