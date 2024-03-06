import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { IBaseService } from './i.base.service';
import { BaseEntity } from './base.entity';
import { BadRequestException } from '@nestjs/common';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(protected readonly repository: Repository<T>) {
    this.repository = repository;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  async store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: string, data: any): Promise<T> {
    const instance = await this.findById(id);

    if (!instance) {
      throw new BadRequestException('Item not found');
    }
    await this.repository.update(id, data);
    return this.findById(id) as Promise<T>;
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  findById(id: string): Promise<T> {
    const findOneOptions = { where: { id } } as FindOneOptions;
    return this.repository.findOne(findOneOptions);
  }

  findByIds(ids: string[]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  findByColumn<X>(column: keyof T, value: X): Promise<T> {
    const findOneOptions = { where: { [column]: value } } as FindOneOptions;
    return this.repository.findOne(findOneOptions);
  }
}
