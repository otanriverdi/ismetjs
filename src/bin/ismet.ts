#! /usr/bin/env node
// The above directive is mandatory for CLI entry points

import chalk from 'chalk';
import {exit, load} from 'helpers';
import meow from 'meow';
import parse from 'parser';
import path from 'path';

const cli = meow(
  `
	Usage
	  $ ismet <directory>

  Examples
	  $ ismet
	  🐙 your issues will be created 🐙
`,
  {
    description:
      '🐙 Automatically generates and manages git repo issues from code comments. ',
  },
);

// main entry point
(async function () {
  // welcome message
  // eslint-disable-next-line
  console.log('🐙 Running', chalk.bold.underline('ismet'), '\n');

  // only accepts a single non-flag input
  const {input} = cli;
  if (input.length > 1) {
    exit('Invalid usage. Run `ismet --help` to see usage examples.', 1);
  }

  // if no dir is passed as an input, we use the current directory
  const directory = input[0] || '.';

  const fullPath = path.join(process.cwd(), directory);

  // getting comments before auth because we don't want to bother the user
  // until we have issues to create
  const comments = (await load(async () => {
    return await parse(fullPath);
  }, `Parsing '${directory}' for issues`)) as string[];
  if (!comments.length) {
    exit(`Found no issues`, 0);
  }

  exit(`Found ${comments.length} issues`, 0);
})();
