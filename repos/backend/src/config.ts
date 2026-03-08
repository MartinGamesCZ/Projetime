import path from 'path';

import { getOsConfigDirPath } from './os/path';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const APP_PORT = Number(process.env.PORT!);
export const APP_HOST = '0.0.0.0';
export const APP_NAME = 'Projetime';

export const DATA_ROOT_PATH = path.join(
  getOsConfigDirPath(),
  APP_NAME.toLowerCase(),
);

export const DB_PATH = path.join(DATA_ROOT_PATH, 'droot.sqlite');
