export default class RuntimeConfig {
  /**
   * Holds the command that the CLI will run. Defaults to 'generator'.
   */
  command: 'version' | 'logout' | 'generator' = 'generator';

  /**
   * Holds the relative directory passed in by the user. Defaults to '.'.
   */
  directory = '.';

  /**
   * Holds the full path joined the `runtime.directory`.
   */
  fullPath = '';

  /**
   * Determines if the generator will run dry. Defaults to `false`.
   */
  dry = false;

  /**
   * Determines if the generator will clean the issues without commands.
   */
  clean = true;
}
