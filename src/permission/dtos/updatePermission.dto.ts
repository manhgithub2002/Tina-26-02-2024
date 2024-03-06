import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UpdatePermissionDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
