import {Options, Parser} from 'acorn';
import jsx from 'acorn-jsx';
import config from 'config';

/**
 * Wrapper around the `parse` function from the `acorn` package.
 * Parses the provided JS input and calls the callback when it finds a comment.
 *
 * @param {string} input
 * @callback onComment
 */
export default function (input: string, onComment: Options['onComment']): void {
  const ecmaVersion = config.ecmaVersion;
  Parser.extend(jsx()).parse(input, {
    // handles both commonjs and ES modules because it doesn't care if `require` is defined
    // as long as the JS is valid.
    sourceType: 'module',
    ecmaVersion,
    onComment,
  });
}
