import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums/permission.enum';

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permisions: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permisions);
