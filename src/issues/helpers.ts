import execa from 'execa';
import {Comment} from 'parser/types';
import {Issue, IssueCreate, IssueUpdate} from './types';

/**
 * Gets the `git` origin of the repo of the cwd.
 */
export async function getOrigin(): Promise<string> {
  const {stdout} = await execa('git', ['config', '--get', 'remote.origin.url']);

  if (!stdout.includes('github')) {
    throw new Error('Currently ismet only supports Github repos!');
  }

  const route = stdout.split('github.com')[1].replace(':', '/');
  const repo = route.split('.')[0];

  return repo.replace('/', '');
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
  comments: Comment[],
  existing: Issue[],
): {
  toCreate: IssueCreate[];
  toUpdate: IssueUpdate[];
  toClose: IssueUpdate[];
} {
  const newComments = comments.filter(
    comment => !existing.find(issue => issue.title === comment.text),
  );

  const toCreate: IssueCreate[] = [];
  newComments.forEach(comment => {
    const duplicate = toCreate.find(c => c.title === comment.text);

    if (duplicate) {
      duplicate.body += `Seen on ${comment.location}\n`;
    } else {
      const issue: IssueCreate = {
        title: comment.text,
        body: `Generated automatically by [ismet](https://www.github.com/otanriverdi/ismetjs) 🐙\n\nSeen on ${comment.location}\n`,
      };

      toCreate.push(issue);
    }
  });

  const toUpdate: IssueUpdate[] = [];
  const toClose: IssueUpdate[] = [];
  for (const issue of existing) {
    const filtered = comments.filter(c => issue.title === c.text);

    // if there are comments for existing issues, we update the body to reflect correct locations
    if (filtered.length) {
      let body =
        'Generated automatically by [ismet](https://www.github.com/otanriverdi/ismetjs) 🐙\n\n';

      filtered.forEach(c => (body += `Seen on ${c.location}\n`));

      const update: IssueUpdate = {
        number: issue.number,
        updates: {
          body,
        },
      };

      toUpdate.push(update);
    } else if (issue.state === 'open' && !filtered.length) {
      toClose.push({number: issue.number});
    }
  }

  return {toCreate, toUpdate, toClose};
}
