import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddPositionForUserDto {
  @ApiProperty()
  @IsNotEmpty()
  positionIds: string[];
}
