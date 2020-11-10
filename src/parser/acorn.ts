import {Options, parse} from 'acorn';
import config from 'config';

/**
 * Wrapper around the `parse` function from the `acorn` module.
 * Parses the provided JS input and calls the callback when it encounters a comment.
 *
 * @param {string} input
 * @callback onComment
 */
export default function (input: string, onComment: Options['onComment']): void {
  const ecmaVersion = config.ecmaVersion;
  parse(input, {
    ecmaVersion,
    onComment,
  });
}
