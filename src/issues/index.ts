import ApiClient from './api-client';
import {getOrigin} from './helpers';

/**
 * Converts comments to issues to be created. Existing issues are ignored. Returns the number
 * of issues created
 */
export default async function (): Promise<number> {
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

  const existingIssues = await api.getIssues(repo);

  // TODO create a helper function that returns issues to be created

  return 0;
}
