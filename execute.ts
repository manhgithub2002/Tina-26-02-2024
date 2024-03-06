import { User } from 'src/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    database: 'tinamys26022024',
    entities: [User],

    seeds: ['./src/database/seeds/*.seeder.ts'],
    factories: ['./src/database/seeds/*.factory.ts'],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
