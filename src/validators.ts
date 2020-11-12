import execa from 'execa';
import {exit} from 'helpers';
import meow from 'meow';

/**
 * Checks if `git` is installed on users system and exits with an error if it's not.
 */
export async function checkGit(): Promise<void> {
  const {stdout} = await execa('git', ['--version']);
  const split = stdout.split(' ');
  if (!(split[0] === 'git' && split[1] === 'version')) {
    exit('Git must be installed to run ismet', 1);
  }
}

/**
 * Checks for the proper usage. Allowed non-flag inputs are determined by this function. It expects all flags
 * to be handled and deleted before being called so any unhandled flag will result in a usage error.
 *
 * @param {meow.Result<any>} cli
 */
export async function checkUsage(cli: meow.Result<any>): Promise<void> {
  // only accepts a single non-flag input
  const {input} = cli;
  if (input.length > 1 || Object.keys(cli.flags).length > 0) {
    exit('Invalid usage. Run `ismet --help` to see usage examples.', 1);
  }
}
