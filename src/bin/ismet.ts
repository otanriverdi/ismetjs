#! /usr/bin/env node
// The above directive is mandatory for CLI entry points

// This is the main entry point for the CLI tool.

import * as commands from 'commands';
import config from 'config';
import * as helpers from 'helpers';
import meow from 'meow';
import path from 'path';
import * as validators from 'validators';

// CLI configuration
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
  const {runtime} = config;

  // flag handled latest gets the precedence
  helpers.flag(cli, 'logout', () => (runtime.command = 'logout'));
  helpers.flag(cli, 'version', () => (runtime.command = 'version'));
  helpers.flag(cli, 'skipClean', () => (runtime.clean = false));
  helpers.flag(cli, 'dryRun', () => (runtime.dry = true));

  if (cli.input[0]) runtime.directory = cli.input[0];
  runtime.fullPath = path.join(process.cwd(), runtime.directory);

  // all flags must be handled before calling the validators
  validators.checkGit();
  validators.checkUsage(cli);

  // these are the commands that will run before the welcome message
  if (runtime.command === 'version' || runtime.command === 'logout') {
    return commands[runtime.command](cli);
  }

  helpers.welcome();

  // defaults to 'generator' if not modified by a flag or input.
  // commands needs to be exported with the same name as they are configured
  // in `runtime.command`
  if (commands[runtime.command]) return commands[runtime.command]();

  helpers.exit('Command not found.', 1);
})();
