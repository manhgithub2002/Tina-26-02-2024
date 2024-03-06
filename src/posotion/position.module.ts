import { Module } from '@nestjs/common';
import { PositionService } from './services/position.service';
import { PositionController } from './controllers/position.controller';
import { RoleModule } from 'src/permission/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), RoleModule],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService],
})
export class PositionModule {}
