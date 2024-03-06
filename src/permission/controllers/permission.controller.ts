import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { Permission } from '../permission.entity';
import { AddPermissionDto } from '../dtos/addPermission.dto';
import { UpdatePermissionDto } from '../dtos/updatePermission.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permission')
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async getPermissions(): Promise<Permission[]> {
    return await this.permissionService.index();
  }
  @Get(':id')
  async getPermission(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.findById(id);
  }
  @Post('add-permission')
  async addPermission(@Body() addPermissionDto: AddPermissionDto) {
    return await this.permissionService.addPermission(addPermissionDto);
  }
  @Put('update-permission/:id')
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionService.update(id, updatePermissionDto);
  }
  @Delete('delete-permission/:id')
  async deletePermission(@Param('id') id: string) {
    return await this.permissionService.delete(id);
  }
}
