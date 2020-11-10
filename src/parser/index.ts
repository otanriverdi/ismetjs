import config from 'config';
import fs from 'fs';
import path from 'path';
import parseComments from './parse';

const {acceptedExtensions} = config;

/**
 * Parses all the files inside the directory on the provided path and returns all
 * comments with the `ismet` directive.
 *
 * @param {string} fullPath
 * @returns {Promise<string[]>} comments[]
 */
export default async function (fullPath: string): Promise<string[]> {
  return await new Promise((resolve, reject) => {
    let comments: string[] = [];

    fs.readdir(fullPath, {encoding: 'utf-8'}, (error, files) => {
      if (error) reject(error);

      files.forEach(file => {
        // checks if the file extension is included inside the allowed extensions configuration
        if (acceptedExtensions.includes(file.split('.').slice(-1)[0])) {
          const data = fs.readFileSync(path.join(fullPath, file), 'utf-8');

          const parsed = parseComments(data);

          comments = [...comments, ...parsed];
        }
      });

      resolve(comments);
    });
  });
}
