import fs from 'fs';
import path from 'path';
import {exit} from './helpers';

/**
 * Validates non-flag inputs and exits if the they are invalid.
 *
 * @param input {string[]} string[] of non-flag inputs
 */
export function input(input: string[]): void {
  let directory = input[0];
  if (!directory) directory = input[0] = '.';

  if (input.length > 1) {
    exit('Unexpected usage. Run `ismet --help` to see usage examples.');
  }

  if (!fs.existsSync(path.join(process.cwd(), directory))) {
    exit('Directory not found.');
  }
}
