import execa from 'execa';
import {Issue} from './types';

/**
 * Gets the `git` origin of the repo of the cwd.
 */
export async function getOrigin(): Promise<string> {
  const {stdout} = await execa('git', ['config', '--get', 'remote.origin.url']);

  const split = stdout.split('@');

  if (split[0] !== 'git') {
    throw new Error("Couldn't retrieve the origin repo");
  }

  return split[1];
}

/**
 * Compares existing issues and comments to determine which comments should be created as issues
 * and which existing issues should be deleted because they are no longer inside the code.
 *
 * @param comments
 * @param existing existing issues
 * @returns operations to call the api with
 */
export function getOperations(
  comments: string[],
  existing: Issue[],
): {toCreate: string[]; toOpen: number[]; toClose: number[]} {
  const toCreate = comments.filter(
    comment => !existing.find(issue => issue.title === comment),
  );

  const toOpen: number[] = [];
  const toClose: number[] = [];
  for (const issue of existing) {
    if (issue.state === 'closed' && comments.includes(issue.title)) {
      toOpen.push(issue.number);
    } else if (issue.state === 'open' && !comments.includes(issue.title)) {
      toClose.push(issue.number);
    }
  }

  return {toCreate: Array.from(new Set([...toCreate])), toOpen, toClose};
}
