import { AddPositionForUserDto } from '../dtos/addPositionForUser.dto';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { User } from '../user.entity';
import * as argon2 from 'argon2';
import { PositionService } from 'src/posotion/services/position.service';
import { UpdatePositionForUserDto } from '../dtos/updatePositionForUser.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private positionService: PositionService,
  ) {
    super(userRepository);
  }
  async getAllUsers(): Promise<User[]> {
    return this.repository.find({ relations: { positions: true } });
  }
  async adminSetNewPassword(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new BadGatewayException('User not found');
    }

    user.password = '123456';

    await this.update(id, user);
  }

  async changePassword(id: string, password: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new BadGatewayException('User not found');
    }

    password = await argon2.hash(password);

    user.password = password;

    await this.update(id, user);
  }

  async getUsersWithBirhdayInMonth(): Promise<User[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    const users = this.userRepository
      .createQueryBuilder('user')
      .where('EXTRACT(MONTH FROM user.birthdate) = :currentMonth', {
        currentMonth,
      })
      .leftJoinAndSelect('user.positions', 'position')
      .getMany();

    return users;
  }

  findUserPermissionById(id: string) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['positions', 'positions.permissions'],
    });
  }

  async addPositionsForUser(
    id: string,
    addPositionForUserDto: AddPositionForUserDto,
  ) {
    const user = await this.repository.findOne({
      where: { id: id },
      relations: { positions: true },
    });

    if (!user) {
      throw new BadRequestException('Position not found');
    }

    const positions = await this.positionService.findByIds(
      addPositionForUserDto.positionIds,
    );

    if (positions.length !== addPositionForUserDto.positionIds.length) {
      throw new NotFoundException('One or more permissions not found');
    }

    user.positions = [...user.positions, ...positions];

    console.log(user.positions);

    await this.store(user);

    return user;
  }

  async UpdatePositionForUser(
    id,
    updatePositionForUserDto: UpdatePositionForUserDto,
  ) {
    const user = await this.repository.findOne({
      where: { id: id },
      relations: { positions: true },
    });

    if (!user) {
      throw new BadRequestException('Position not found');
    }

    const positions = await this.positionService.findByIds(
      updatePositionForUserDto.positionIds,
    );

    if (positions.length !== updatePositionForUserDto.positionIds.length) {
      throw new NotFoundException('One or more permissions not found');
    }

    user.positions = positions;

    await this.store(user);

    return user;
  }
}
