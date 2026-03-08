import { DataSource } from 'typeorm';

import { DB_PATH } from '@/config';
import { ClientEntity } from './entities/Client';
import { EntryEntity } from './entities/Entry';
import { ProjectEntity } from './entities/Project';

export const Entities = [ClientEntity, ProjectEntity, EntryEntity];

export const Database = new DataSource({
  type: 'sqlite',
  database: DB_PATH,
  synchronize: true,
  entities: Entities,
  dropSchema: true,
});

export const Repositories = {
  clients: Database.getRepository(ClientEntity),
  projects: Database.getRepository(ProjectEntity),
  entries: Database.getRepository(EntryEntity),
};
