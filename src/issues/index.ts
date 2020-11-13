import ApiClient from './api-client';
import {getOperations, getOrigin} from './helpers';

/**
 * Creates issues from comments that are not already created. By default, also closes issues that does not have
 * their comments in the code anymore.
 *
 * @param comments
 * @param clean - determines if deleted comments will close existing issues
 */
export default async function createIssues(
  comments: string[],
  clean = true,
): Promise<number> {
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

  // console.log('\n', operations);

  return 0;
}
