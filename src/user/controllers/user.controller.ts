import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { User } from '../user.entity';
import { Position } from 'src/posotion/position.entity';
import { Permission } from 'src/permission/permission.entity';
import { UserSeeder } from 'src/database/seeds/user.seeder';
import userFactory from 'src/database/factories/user.factory';
import { loadEntities } from 'src/common/utils/entityLoader';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('seeding')
  async seedingUser() {
    const options: DataSourceOptions & SeederOptions = {
      type: 'postgres',
      database: 'tinamys26022024',
      username: 'postgres',
      password: '123',
      entities: [User, Position, Permission],
      port: 5432,

      seeds: [UserSeeder],
      factories: [userFactory],
    };

    const dataSource = new DataSource(options);
    await dataSource.initialize();

    const result = await runSeeders(dataSource);

    return result;
  }

  @Post('test')
  test() {
    return loadEntities();
  }
}
