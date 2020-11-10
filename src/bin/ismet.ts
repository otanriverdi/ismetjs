#! /usr/bin/env node
// The above directive is mandatory for CLI entry points

import {validators} from 'cli';
import {Instance} from 'cli/instance';
import meow from 'meow';
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
(function () {
  validators.input(cli.input);

  const instance: Instance = {
    directory: cli.input[0],
  };

  // eslint-disable-next-line
  console.log('Hello,', path.join(process.cwd(), instance.directory));
})();
