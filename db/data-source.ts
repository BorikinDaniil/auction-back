import { DataSource, DataSourceOptions } from 'typeorm';

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_ENTITIES_PATH,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_MIGRATIONS,
} = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: TYPEORM_HOST,
  port: +TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  entities: [TYPEORM_ENTITIES_PATH],
  synchronize: TYPEORM_SYNCHRONIZE === 'true' || false,
  migrations: [TYPEORM_MIGRATIONS],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
