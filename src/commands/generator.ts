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

  if (runtime.dry) {
    //eslint-disable-next-line
    console.table(comments);
    helpers.exit(`Found ${comments.length} issues as comments.`);
  }

  await helpers.load(async () => await authenticate(), 'Authenticating...');

  const {created, closed} = await helpers.load(
    async () => await generateIssues(comments, runtime.clean),
    'Managing issues...',
  );

  helpers.exit(
    `Done! ${created ? `${created} new issues. ` : ''}${
      closed ? `${closed} issues closed.` : ''
    }`,
    0,
  );
}
