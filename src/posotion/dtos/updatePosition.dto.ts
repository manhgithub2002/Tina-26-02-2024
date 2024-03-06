import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UpdatePositionDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 20)
  displayName: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
