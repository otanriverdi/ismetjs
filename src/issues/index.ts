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
  comments: string[],
  clean = true,
): Promise<{created: number; opened: number; closed: number}> {
  const api = new ApiClient();

  const origin = await getOrigin();
  if (!origin.includes('github.com:')) {
    throw new Error('Currently ismet only supports Github repos!');
  }

  const repo = origin.split(':')[1].split('.')[0];

  const repos = await api.getUserRepos();
  if (!repos.find(r => r.full_name === repo)) {
    throw new Error(
      'You dont have explicit permissions for this repo. Use `--logout` to logout.',
    );
  }

  const existing = await api.getIssues(repo);
  const operations = getOperations(comments, existing);

  for (const title of operations.toCreate) {
    await api.createIssue(title, repo);
  }

  // we skip cleaning if the flag was added
  if (clean) {
    for (const number of operations.toClose) {
      await api.toggleIssue(number, 'closed', repo);
    }
  }

  for (const number of operations.toOpen) {
    await api.toggleIssue(number, 'open', repo);
  }

  return {
    created: operations.toCreate.length,
    opened: operations.toOpen.length,
    closed: operations.toClose.length,
  };
}
