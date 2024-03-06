import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Position } from './posotion/position.entity';
import { BirthdayModule } from './birthday/birthday.module';
import { Permission } from './permission/permission.entity';
import { RoleModule } from './permission/role.module';
import { PositionModule } from './posotion/position.module';
import { join } from 'path';
import { UploadModule } from './uploads/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [User, Position, Permission],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    BirthdayModule,
    PositionModule,
    RoleModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
