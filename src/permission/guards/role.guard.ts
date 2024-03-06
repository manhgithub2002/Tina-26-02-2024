import { UserService } from '../../user/services/user.service';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard extends AccessTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const canActivateJwt = await super.canActivate(context);

    if (!canActivateJwt) {
      return false;
    }
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const existingUser = await this.userService.findById(user['sub']);

    if (!existingUser) {
      return false;
    }
    return requiredRoles.some((role) => existingUser.role === role);
  }
}
