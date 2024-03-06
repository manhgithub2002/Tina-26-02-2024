import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User, UserRole } from '../user.entity';
import { UserService } from '../services/user.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { RolesGuard } from 'src/permission/guards/role.guard';
import { Roles } from 'src/permission/decorators/roles.decorator';
import { AddPositionForUserDto } from '../dtos/addPositionForUser.dto';
import { UpdatePositionForUserDto } from '../dtos/updatePositionForUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from 'src/permission/guards/permission.guard';
import { Permission } from 'src/permission/enums/permission.enum';
import { Permissions } from 'src/permission/decorators/permission.decorator';

@ApiTags('Admin: Khoản lý tài khoản người dùng')
@Controller('admin-users')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  findAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Get('check-permission')
  // @SetMetadata("permissions",)
  // @HasPermission()
  @UseGuards(PermissionsGuard)
  async check() {
    return await this.userService.index();
  }

  @Post('add-positions/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  addPositionForUser(
    @Param('id') id: string,
    @Body() addPositionForUserDto: AddPositionForUserDto,
  ): Promise<User> {
    return this.userService.addPositionsForUser(id, addPositionForUserDto);
  }

  @Put('update-positions/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  updatePositionForUser(
    @Param('id') id: string,
    @Body() updatePositionForUserDto: UpdatePositionForUserDto,
  ): Promise<User> {
    return this.userService.UpdatePositionForUser(id, updatePositionForUserDto);
  }
}
