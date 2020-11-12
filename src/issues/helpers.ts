import execa from 'execa';

/**
 * Gets the origin of the `git` repo on the cwd.
 */
export async function getOrigin(): Promise<string> {
  const {stdout} = await execa('git', ['config', '--get', 'remote.origin.url']);

  const split = stdout.split('@');

  if (split[0] !== 'git') {
    throw new Error("Couldn't retrieve the origin repo");
  }

  return split[1];
}
