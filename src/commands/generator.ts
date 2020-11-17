import {authenticate} from 'auth';
import config from 'config';
import * as helpers from 'helpers';
import generateIssues from 'issues';
import parse from 'parser';

/**
 * Runs the default Ismet operation of parsing for comments and creating issues on the remote.
 * If the runtime has the dry option enabled, creation of comments will be skipped.
 */
export default async function defaultCommand(): Promise<void> {
  const {runtime} = config;

  // getting comments before auth because we don't want to bother the user
  // until we have issues to create
  const comments = await helpers.load(
    async () => await parse(runtime.fullPath),
    `Parsing '${runtime.directory}' for issues...`,
  );
  if (!comments.length) {
    helpers.exit(`Found no issues.`, 0);
  }

  if (runtime.dry) {
    //eslint-disable-next-line
    console.table(comments);
    helpers.exit(`Found ${comments.length} issues as comments.`);
  }

  await helpers.load(async () => await authenticate(), 'Authenticating...');

  const titles = comments.map(c => c.text);
  const {created, closed, opened} = await helpers.load(
    async () => await generateIssues(titles, runtime.clean),
    'Creating issues...',
  );

  helpers.exit(
    `Created ${created}, closed ${closed}, opened ${opened} issues.`,
    0,
  );
}
