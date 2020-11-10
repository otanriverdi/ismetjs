import config from 'config';
import acorn from './acorn';

/**
 * Parses the provided JS input and returns all comments with an Ismet directive.
 * Directive string will be removed. If the JS file throws an error, it will return an empty array.
 *
 * @param {string} input
 * @returns {string[] | null} comments[]
 */
export default function (input: string): string[] {
  const {directive} = config;

  const comments: string[] = [];

  try {
    acorn(input, (block, text) => {
      if (text.includes(directive)) {
        // JSDoc style comment blocks is enforced by editors and returns some unwanted characters
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
    return [];
  }

  return comments;
}
