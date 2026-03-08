import path from 'path';
import os from 'os';

export function getOsConfigDirPath() {
  switch (process.platform) {
    case 'win32':
      return process.env.APPDATA!;
    case 'darwin':
      return path.join(os.homedir(), 'Library', 'Application Support');
    case 'linux':
      return path.join(os.homedir(), '.config');
    default:
      return os.homedir();
  }
}
