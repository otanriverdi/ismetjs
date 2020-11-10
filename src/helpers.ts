import ora from 'ora';

/**
 * Displays a message and exits the CLI. A new `ora.Ora` instance will be created unless
 * an existing one is passed in. Message flair will be `Ora.fail` or `Ora.succeed` based on the status code
 *
 * @param message {string} message to display
 * @param code {number} exit code (0)
 * @param spinner {ora.Ora} existing ora instance
 */
export function exit(message: string, code = 0, spinner?: ora.Ora): void {
  if (!spinner) spinner = ora('\n' + message);
  else spinner.text = message;

  if (code > 0) {
    spinner.fail();
  } else spinner.succeed();

  process.exit(code);
}
