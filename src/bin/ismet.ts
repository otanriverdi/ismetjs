#! /usr/bin/env node
// The above directive is mandatory for CLI entry points

// This is the entry point for the CLI tool.

import meow from 'meow';

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

// main
(function () {
  // eslint-disable-next-line
  console.log('Hello, world!');
})();
