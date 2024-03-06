import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  name: string;
}
