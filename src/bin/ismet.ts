#! /usr/bin/env node
// The above directive is mandatory for CLI entry points

/// This is the entry point for the cli tool.

import config from 'config';

console.log(config.ecmaVersion);
