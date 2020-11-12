import config from 'config';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import parseComments from './parse';

const readdir = promisify(fs.readdir);

const {acceptedExtensions} = config;

/**
 * Parses all the files inside the directory on the provided path and returns all
 * comments with the `ismet` directive.
 *
 * @param {string} fullPath
 * @returns {Promise<string[]>} comments[]
 */
export default async function parse(fullPath: string): Promise<string[]> {
  const dirents = await readdir(fullPath, {
    encoding: 'utf-8',
  });

  let comments: string[] = [];

  for (const dirent of dirents) {
    // if the dirent is a directory, we recursively call parse with its path
    const direntPath = path.resolve(fullPath, dirent);
    const info = fs.statSync(direntPath);
    if (info.isDirectory()) {
      const parsed = await parse(direntPath);

      comments = [...comments, ...parsed];
    }

    // checks if the file extension is included inside the allowed extensions configuration
    else if (acceptedExtensions.includes(dirent.split('.').slice(-1)[0])) {
      const data = fs.readFileSync(path.join(fullPath, dirent), 'utf-8');

      const parsed = parseComments(data);

      comments = [...comments, ...parsed];
    }
  }

  return comments;
}
