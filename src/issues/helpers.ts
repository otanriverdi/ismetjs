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
 */
export function getOperations(
  comments: string[],
  existing: Issue[],
): {toCreate: string[]; toOpen: number[]; toClose: number[]} {
  const openIssues = existing.filter(issue => issue.state === 'open');
  const closedIssues = existing.filter(issue => issue.state === 'closed');

  const toCreate = comments.filter(
    comment => !existing.find(issue => issue.title === comment),
  );

  const toOpen = closedIssues
    .filter(issue => comments.includes(issue.title))
    .map(i => i.id);

  const toClose: number[] | undefined = openIssues
    .filter(issue => !comments.includes(issue.title))
    .map(i => i.id);

  return {toCreate, toOpen, toClose};
}
