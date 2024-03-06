import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsDate } from 'class-validator';
import { BaseEntity } from '../common/base.entity';
import { Position } from '../posotion/position.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

export enum UserRole {
  SUPRERADMIN = 'superadmin',
  ADMIN = 'admin',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column()
  fullname: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty({ enum: ['superadmin', 'admin', 'staff', 'customer'] })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  @IsDate()
  birthdate: Date;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({ default: false })
  isVerify: boolean;

  @ApiProperty()
  @Column({ default: 0 })
  tokenVersion: number;

  @ManyToMany(() => Position, (position) => position.members)
  @Transform(({ value }) => value.map((position) => position.displayName))
  positions: Position[];
}
