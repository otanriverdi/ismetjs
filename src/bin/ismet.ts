#! /usr/bin/env node
// The above directive is mandatory for CLI entry points

import {authenticate, logout} from 'auth';
import * as helpers from 'helpers';
import generateIssues from 'issues';
import meow from 'meow';
import parse from 'parser';
import path from 'path';
import * as validators from 'validators';

const cli = meow(
  `
	Usage
    $ ismet <directory>
  
  Options
    --logout, -l Logout from Github

  Examples
	  $ ismet
    🐙 your issues will be created 🐙
`,
  {
    description:
      '🐙 Automatically generates and manages git repo issues from code comments. Ignores files in `.gitignore`.',
    flags: {
      logout: {
        type: 'boolean',
      },
    },
  },
);

// main entry point
(async function () {
  helpers.welcome();
  helpers.flag(cli, 'logout', () => {
    logout();
    helpers.exit('Logged out', 0);
  });

  // ALL FLAGS MUST BE HANDLED BEFORE CALLING CHECK USAGE
  validators.checkGit();
  validators.checkUsage(cli);

  // if no dir is passed as an input, we use the current directory
  const directory = cli.input[0] || '.';
  const fullPath = path.join(process.cwd(), directory);

  // getting comments before auth because we don't want to bother the user
  // until we have issues to create
  const comments = (await helpers.load(async () => {
    return await parse(fullPath);
  }, `Parsing '${directory}' for issues`)) as string[];
  if (!comments.length) {
    helpers.exit(`Found no issues`, 0);
  }

  await helpers.load(async () => await authenticate(), 'Authenticating');

  const created = await helpers.load(
    async () => await generateIssues(),
    'Creating issues',
  );

  // TODO replace with created
  helpers.exit(`Created ${created} issues.`, 0);
})();
