import parse from './parse';

/**
 * Parses all the files inside the directory on the provided path and returns all
 * comments with the `ismet` directive.
 *
 * @param {string} path
 * @returns {string[] | null} comments[]
 */
export default function (path: string): string[] {
  // fs get all files in cwd
  parse('//hello');

  return [];
}
