import { DataSource } from 'typeorm';

import { DB_PATH } from '@/config';

export const Entities = [];

export const Database = new DataSource({
  type: 'sqlite',
  database: DB_PATH,
  synchronize: true,
  entities: Entities,
  dropSchema: true,
});

export const Repositories = {};
