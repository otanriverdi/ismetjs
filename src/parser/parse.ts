import config from 'config';
import parseJS from './acorn';
import {Comment} from './types';

const {directive} = config;

/**
 * Parses the provided JS input and returns all comments with an `ismet` directive.
 * Directive string will be removed. If the JS file throws an error, it will return an empty array.
 *
 * @param input javascript, jsx code as a string
 * @returns ismet comments
 */
export default function parseComments(
  input: string,
  relativePath: string,
): Comment[] {
  const comments: Comment[] = [];

  try {
    parseJS(input, (block, text, _, __, loc) => {
      if (text.includes(directive)) {
        // JSDoc style comment blocks is enforced by some editors and adds some unwanted characters
        // that needs to be replaced
        if (block) {
          text = text.replace(/\n/g, '');
          text = text.replace(/\*/g, '');
        }

        let location = '';
        if (loc) {
          location = relativePath + ':' + loc.line + ':' + loc.column;
        }

        text = text.replace(directive, '');

        comments.push({text: text.trim(), location});
      }
    });
  } catch {
    // all errors here will be parsing errors and we don't care about users errors
    return [];
  }

  return comments;
}
