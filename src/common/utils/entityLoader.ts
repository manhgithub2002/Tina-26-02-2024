import { glob, Glob } from 'glob';
import * as path from 'path';
import { BaseEntity } from '../base.entity';

export const loadEntities = async () => {
  const entities: Function[] = [];

  const files = await glob('src/**/*.entity.ts', {
    ignore: 'src/common/*.entity.ts',
  });
  console.log(files);

  const aaa = [path.join(__dirname, 'src/**/*.entity.ts')];
  console.log(aaa);
  files.forEach((file) => {
    const entityModule = require(file);

    // Check if the exported content is a class and has the @Entity() decorator
    if (
      typeof entityModule === 'function' &&
      entityModule.prototype instanceof BaseEntity
    ) {
      entities.push(entityModule);
    }
  });
  return entities;
};
