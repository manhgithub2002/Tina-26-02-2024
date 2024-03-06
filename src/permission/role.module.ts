import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PermissionsController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { Permission } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class RoleModule {}
