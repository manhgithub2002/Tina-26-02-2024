import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePositionForUserDto {
  @ApiProperty()
  @IsNotEmpty()
  positionIds: string[];
}
