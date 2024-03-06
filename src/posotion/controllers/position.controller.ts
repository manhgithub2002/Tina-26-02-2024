import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PositionService } from '../services/position.service';
import { Position } from '../position.entity';
import { DeleteResult } from 'typeorm';
import { AddPositionDto } from '../dtos/addPosition.dto';
import { UpdatePositionDto } from '../dtos/updatePosition.dto';
import { AddPermissionForPositionDto } from '../dtos/addPermissionForPosition.dto';
import { UpdatePermissionForPositionDto } from '../dtos/updatePermissionForPosition.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Position')
@Controller('positions')
@UseInterceptors(ClassSerializerInterceptor)
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async getPositions(): Promise<Position[]> {
    return this.positionService.getAllPositions();
  }

  @Post('add-position')
  async createPosition(@Body() addPositionDto: AddPositionDto) {
    return this.positionService.storePosition(addPositionDto);
  }

  @Put('update-position/:id')
  async updatePosition(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete('delete-position/:id')
  async deletePosition(@Param() id: string): Promise<DeleteResult> {
    return this.positionService.delete(id);
  }

  @Post('add-permissions/:id')
  addPermissionForPosition(
    @Param('id') id: string,
    @Body() addPermissionForPositionDto: AddPermissionForPositionDto,
  ) {
    return this.positionService.addPermissionForPosition(
      id,
      addPermissionForPositionDto,
    );
  }

  @Put('update-permissions/:id')
  updatePermissionDtoForPosition(
    @Param('id') id: string,
    @Body() updatePermissionForPositionDto: UpdatePermissionForPositionDto,
  ) {
    return this.positionService.UpdatePermissionForPosition(
      id,
      updatePermissionForPositionDto,
    );
  }
}
