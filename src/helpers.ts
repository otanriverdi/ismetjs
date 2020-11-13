// CLI helpers

import chalk from 'chalk';
import meow from 'meow';
import ora from 'ora';

/**
 * Displays a message styled based on the status code and exits the CLI with the provided code.
 *
 * @param {string} message message to display
 * @param {number} code exit code (default: 0)
 */
export function exit(message: string, code = 0): void {
  // eslint-disable-next-line
  console.log('');

  if (code > 0) {
    // eslint-disable-next-line
    console.log('🐙', chalk.red.underline.bold(message));
  } else {
    // eslint-disable-next-line
    console.log('🐙', chalk.green.underline.bold(message));
  }

  process.exit(code);
}

/**
 * Displays an `ora` spinner with the specified message until the async action ends. The result of the action
 * will be returned. If the action resolves, the spinner will switch to a success message. If the action fails,
 * the `error` will be logged and `helpers.exit()` will  be called with a status code of `1`.
 *
 * @param {() => Promise<unknown>} action
 * @param {string} message
 */
export async function load<T>(
  action: (spinner: ora.Ora) => Promise<T>,
  message: string,
): Promise<T> {
  const spinner = ora(message).start();

  try {
    // we expose the spinner to the action in case the message needs to be updated
    const results = await action(spinner);

    spinner.succeed();

    return results;
  } catch (error) {
    spinner.fail();

    // eslint-disable-next-line
    console.log('');
    // eslint-disable-next-line
    console.error(error);

    exit('Failure. Check the error log for more details', 1);

    throw '';
  }
}

/**
 * Executes the callback if the flag exists and then deletes the flag. It's getting deleted so that the usage
 * validation can check if there are any flags remaining. Can be awaited if the callback is async.
 *
 * @param {meow.Result<any>} cli
 * @param {string} name
 * @returns flag
 * @callback callback
 */
export function flag(
  cli: meow.Result<any>,
  name: string,
  callback: () => any = () => {
    return;
  },
): void {
  const flag = cli.flags[name];

  if (flag) {
    callback();
  }

  delete cli.flags[name];
}

/**
 * Displays the welcome message.
 */
export function welcome(): void {
  // eslint-disable-next-line
  console.log('🐙 Running', chalk.bold.underline('ismet'), '\n');
}
