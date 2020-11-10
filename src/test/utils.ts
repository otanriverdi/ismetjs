import fs from 'fs';
import path from 'path';

export function readAndParse(
  relativePath: string,
  callback: (data: string) => void,
): void {
  // TODO how can we make this relative to where it's called?
  fs.readFile(path.join(__filename, relativePath), 'utf-8', (err, data) => {
    if (err) {
      // eslint-disable-next-line
      console.error(err);
    } else {
      callback(data);
    }
  });
}
