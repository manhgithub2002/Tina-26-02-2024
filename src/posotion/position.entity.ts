import { User } from 'src/user/user.entity';
import { BaseEntity } from '../common/base.entity';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { Permission } from 'src/permission/permission.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Position extends BaseEntity {
  @Column()
  displayName: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.positions, { cascade: true })
  @JoinTable()
  members: User[];

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable()
  @Transform(({ value }) => value.map((permission) => permission.name))
  permissions: Permission[];

  @Column('simple-array', { nullable: true })
  permisstionIds: string[];
}
