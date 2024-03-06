import { ExecutionContext as NestExecutionContext } from '@nestjs/common';

export interface CustomExecutionContext extends NestExecutionContext {
  get<T>(key: string): T;
}
