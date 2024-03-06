import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePermissionForPositionDto {
  @ApiProperty()
  @IsNotEmpty()
  permissionIds: string[];
}
