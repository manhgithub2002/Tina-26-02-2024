import { PERMISSION_KEY } from './../decorators/permission.decorator';
import { UserService } from 'src/user/services/user.service';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../permission.entity';

@Injectable()
export class PermissionsGuard extends AccessTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    const canActiveJwt = await super.canActivate(context);

    if (!canActiveJwt) {
      return false;
    }

    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const existingUser = await this.userService.findUserPermissionById(
      user['sub'],
    );

    if (!existingUser) {
      return false;
    }
    const currentUserPermissions = existingUser.positions.flatMap(
      (position) => position.permissions,
    );

    return requiredPermissions.some((permission) =>
      currentUserPermissions?.includes(permission),
    );
  }
}
