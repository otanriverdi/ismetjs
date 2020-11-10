import config from 'config';
import acorn from './acorn';

const {directive} = config;

/**
 * Parses the provided JS input and returns all comments with an `ismet` directive.
 * Directive string will be removed. If the JS file throws an error, it will return an empty array.
 *
 * @param {string} input
 * @returns {string[] | null} comments[]
 */
export default function (input: string): string[] {
  const comments: string[] = [];

  try {
    acorn(input, (block, text) => {
      if (text.includes(directive)) {
        // JSDoc style comment blocks is enforced by some editors and adds some unwanted characters
        // that needs to be replaced
        if (block) {
          text = text.replace(/\n/g, '');
          text = text.replace(/\*/g, '');
        }

        text = text.replace(directive, '');

        comments.push(text.trim());
      }
    });
  } catch {
    // all errors here will be parsing errors and we don't care about the errors
    // inside the users files
    return [];
  }

  return comments;
}
