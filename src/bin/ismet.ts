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
    $ ismet <directory (default: '.')>
  
  Options
    --skip-clean -> Will not close deleted issues
    --dry-run -> Prints found issues without creating.
    --logout, -l -> Logs out from Github
    --version, -v -> Prints version

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
        alias: 'l',
      },
      skipClean: {
        type: 'boolean',
      },
      version: {
        type: 'boolean',
        alias: 'v',
      },
      dryRun: {
        type: 'boolean',
      },
    },
  },
);

// main entry point
(async function () {
  // Flags will be handled in the order they are called here

  helpers.flag(cli, 'version', () => {
    //eslint-disable-next-line
    console.log(cli.pkg.version);
    process.exit(0);
  });

  helpers.flag(cli, 'logout', () => {
    logout();
    helpers.exit('Logged out', 0);
  });

  let clean = false;
  helpers.flag(cli, 'skipClean', () => {
    clean = true;
  });

  let dry = false;
  helpers.flag(cli, 'dryRun', () => {
    dry = true;
  });

  // ALL FLAGS MUST BE HANDLED BEFORE CALLING CHECK USAGE
  validators.checkGit();
  validators.checkUsage(cli);

  // Some flags may need to print before welcoming
  helpers.welcome();

  // if no dir is passed as an input, we use the current directory
  const directory = cli.input[0] || '.';
  const fullPath = path.join(process.cwd(), directory);

  // getting comments before auth because we don't want to bother the user
  // until we have issues to create
  const comments = await helpers.load(
    async () => await parse(fullPath),
    `Parsing '${directory}' for issues...`,
  );
  if (!comments.length) {
    helpers.exit(`Found no issues.`, 0);
  }

  if (dry) {
    const unique = Array.from(new Set([...comments]));
    //eslint-disable-next-line
    console.table(unique);
    helpers.exit(`Found ${unique.length} issues to be created`);
  }

  await helpers.load(async () => await authenticate(), 'Authenticating...');

  const {created, closed, opened} = await helpers.load(
    async () => await generateIssues(comments, clean),
    'Creating issues...',
  );

  helpers.exit(
    `Created ${created}, closed ${closed}, opened ${opened} issues.`,
    0,
  );
})();
