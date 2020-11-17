import {Comment} from 'parser/types';
import ApiClient from './api-client';
import {getOperations, getOrigin} from './helpers';

/**
 * Creates issues from comments that are not already created. By default, also closes issues that does not have
 * their comments in the code anymore. If an issue to be created was already opened and closed in the past, it
 * gets reopened.
 *
 * @param comments
 * @param clean - determines if deleted comments will close existing issues
 * @returns # of operations as an object
 * @default clean true
 */
export default async function createIssues(
  comments: Comment[],
  clean = true,
): Promise<{created: number; closed: number}> {
  const api = new ApiClient();

  const repo = await getOrigin();

  const repos = await api.getUserRepos();
  if (!repos.find(r => r.full_name === repo)) {
    throw new Error(
      'You dont have explicit permissions for this repo. Use `--logout` to logout.',
    );
  }

  const existing = await api.getIssues(repo);
  const operations = getOperations(comments, existing);

  for (const issue of operations.toCreate) {
    await api.createIssue(issue, repo);
  }

  // we skip cleaning if the flag was added
  if (clean) {
    for (const issue of operations.toClose) {
      await api.editIssue(issue, repo, 'closed');
    }
  }

  for (const issue of operations.toUpdate) {
    await api.editIssue(issue, repo);
  }

  return {
    created: operations.toCreate.length,
    closed: operations.toClose.length,
  };
}
