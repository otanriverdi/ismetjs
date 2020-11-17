import {readAndParse} from 'test/utils';
import parse from '../parse';

describe('parseComments()', () => {
  let input: string;

  beforeAll(() => {
    return new Promise(res => {
      readAndParse('../../test/to-parse/sub/to-parse.js', data => {
        input = data;
        res();
      });
    });
  });

  test('should parse opening/closing comments', () =>
    expect(parse(input, '')[0].text).toBe('1'));

  test('should parse block comments', () =>
    expect(parse(input, '')[1].text).toBe('2'));

  test('should keep spaces in a sentence', () =>
    expect(parse(input, '')[2].text).toBe('3 sentence'));

  test('should remove the trailing whitespace', () =>
    expect(parse(input, '')[3].text).toBe('4'));

  test('should skip comments without the directive', () =>
    expect(parse(input, '').length).toBe(4));

  test('should silently return an empty array if input JS throws an error', () => {
    readAndParse('../../test/to-parse/to-parse-error.js', data =>
      expect(parse(data, '').length).toBe(0),
    );
  });

  test('should handle both commonjs and ES modules', () => {
    readAndParse('../../test/to-parse/to-parse-modules.js', data =>
      expect(parse(data, '').length).toBe(1),
    );
  });

  test('should handle jsx', () => {
    readAndParse('../../test/to-parse/to-parse-jsx.js', data =>
      expect(parse(data, '').length).toBe(1),
    );
  });
});
