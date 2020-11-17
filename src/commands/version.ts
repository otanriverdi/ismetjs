import meow from 'meow';

/**
 * Prints the version of `ismetjs`.
 *
 * @param cli
 */
export default function versionCommand(cli: meow.Result<any>): void {
  //eslint-disable-next-line
  console.log(cli.pkg.version);
  process.exit(0);
}
