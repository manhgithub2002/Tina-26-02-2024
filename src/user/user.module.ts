import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PositionModule } from 'src/posotion/position.module';
import { AdminUserController } from './controllers/admin-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PositionModule],
  controllers: [UserController, AdminUserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
