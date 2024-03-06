import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class AddPermissionDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
