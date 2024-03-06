import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: 'tinamys26022024',

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  seedTracking: false,
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
