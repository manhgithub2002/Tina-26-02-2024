import { AddPermissionDto } from '../../permission/dtos/addPermission.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Position } from '../position.entity';
import { AddPositionDto } from '../dtos/addPosition.dto';
import { PermissionService } from 'src/permission/services/permission.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPermissionForPositionDto } from '../dtos/addPermissionForPosition.dto';
import { UpdatePermissionForPositionDto } from '../dtos/updatePermissionForPosition.dto';

@Injectable()
export class PositionService extends BaseService<Position> {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    private permisstionService: PermissionService,
  ) {
    super(positionRepository);
  }

  async getAllPositions(): Promise<Position[]> {
    return this.repository.find({ relations: { permissions: true } });
  }
  async storePosition(addPositionDto: AddPositionDto) {
    const existingPosition = await this.findByColumn(
      'displayName',
      addPositionDto.displayName,
    );

    if (existingPosition) {
      throw new BadRequestException('Position already exists');
    }

    const position = new Position();

    position.displayName = addPositionDto.displayName;
    position.description = addPositionDto.description;

    await this.store(position);
    return position;
  }

  async addPermissionForPosition(
    id,
    addPermissionForPositionDto: AddPermissionForPositionDto,
  ) {
    const position = await this.repository.findOne({
      where: { id: id },
      relations: { permissions: true },
    });

    if (!position) {
      throw new BadRequestException('Position not found');
    }

    const permissions = await this.permisstionService.findByIds(
      addPermissionForPositionDto.permissionIds,
    );

    if (
      permissions.length !== addPermissionForPositionDto.permissionIds.length
    ) {
      throw new NotFoundException('One or more permissions not found');
    }

    position.permissions = [...position.permissions, ...permissions];
    position.permisstionIds = [
      ...position.permisstionIds,
      ...addPermissionForPositionDto.permissionIds,
    ];

    await this.store(position);

    return position;
  }

  async UpdatePermissionForPosition(
    id,
    updatePermissionForPositionDto: UpdatePermissionForPositionDto,
  ) {
    const position = await this.repository.findOne({
      where: { id: id },
      relations: { permissions: true },
    });

    if (!position) {
      throw new BadRequestException('Position not found');
    }

    const permissions = await this.permisstionService.findByIds(
      updatePermissionForPositionDto.permissionIds,
    );

    if (
      permissions.length !== updatePermissionForPositionDto.permissionIds.length
    ) {
      throw new NotFoundException('One or more permissions not found');
    }
    position.permissions = permissions;
    position.permisstionIds = updatePermissionForPositionDto.permissionIds;

    await this.store(position);

    return position;
  }
}
