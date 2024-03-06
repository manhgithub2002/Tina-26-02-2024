import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddPermissionForPositionDto {
  @ApiProperty()
  @IsNotEmpty()
  permissionIds: string[];
}
