/**
 * Each export of this module corresponds to a command that the CLI can run.
 */

import generatorCommand from './generator';
import logoutCommand from './logout';
import versionCommand from './version';

// exports from this file should match their string name in `config.runtime.command` type
export const version = versionCommand;
export const generator = generatorCommand;
export const logout = logoutCommand;
