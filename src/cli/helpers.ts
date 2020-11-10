import ora from 'ora';

export function exit(message: string): void {
  const spinner = ora(message);

  spinner.fail();

  process.exit(1);
}
