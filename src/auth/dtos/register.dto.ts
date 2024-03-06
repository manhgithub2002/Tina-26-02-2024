import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 20)
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 20)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
