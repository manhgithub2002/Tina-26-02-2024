import { DeleteResult } from 'typeorm';
import { BaseEntity } from './base.entity';

export interface IBaseService<T extends BaseEntity> {
  index(): Promise<T[]>;

  store(data: any): Promise<T>;

  update(id: string, data: any): Promise<T>;

  delete(id: string): Promise<DeleteResult>;

  findById(id: string): Promise<T | null>;

  findByIds(ids: string[]): Promise<T[]>;

  findByColumn<X>(column: keyof T, value: X): Promise<T | null>;
}
