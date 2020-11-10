import {Options, Parser} from 'acorn';
import jsx from 'acorn-jsx';
import config from 'config';

/**
 * Wrapper around the `acorn.parse` function.
 * Parses the provided JS input and calls the callback when it finds a comment.
 *
 * @param {string} input
 * @callback onComment
 */
export default function (input: string, onComment: Options['onComment']): void {
  const {ecmaVersion} = config;

  // in the future the parser can be replaced with `acorn-loose` to be more forgiving
  // towards errors
  Parser.extend(jsx()).parse(input, {
    // handles both commonjs and ES modules because it doesn't care if `require` is defined
    // as long as the JS is valid.
    sourceType: 'module',
    ecmaVersion,
    onComment,
  });
}
