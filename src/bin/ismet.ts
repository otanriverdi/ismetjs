#! /usr/bin/env node
// The above directive is mandatory for CLI entry points

import fs from 'fs';
import {exit} from 'helpers';
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
  const {input} = cli;
  let directory = input[0];

  if (!directory) directory = '.';

  if (input.length > 1) {
    exit('Invalid usage. Run `ismet --help` to see usage examples.', 1);
  }

  if (!fs.existsSync(path.join(process.cwd(), directory))) {
    exit('Directory not found.', 1);
  }
})();
