import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Permission } from '../permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPermissionDto } from '../dtos/addPermission.dto';

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {
    super(permissionRepository);
  }

  async addPermission(addPermissionDto: AddPermissionDto) {
    const existingPermission = await this.findByColumn(
      'name',
      addPermissionDto.name,
    );

    if (existingPermission) {
      throw new BadRequestException('Permission already exists');
    }

    const permission = new Permission();
    permission.name = addPermissionDto.name;
    return this.store(permission);
  }
}
