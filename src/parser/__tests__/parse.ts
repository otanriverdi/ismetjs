import {readAndParse} from 'test/utils';
import parse from '../parse';

describe('Parser', () => {
  let input: string;

  beforeAll(() => {
    return new Promise(res => {
      readAndParse('../../test/to-parse/to-parse.js', data => {
        input = data;
        res();
      });
    });
  });

  it('should parse opening/closing comments', () =>
    expect(parse(input)[0]).toBe('1'));

  it('should parse block comments', () => expect(parse(input)[1]).toBe('2'));

  it('should keep spaces in a sentence', () =>
    expect(parse(input)[2]).toBe('3 sentence'));

  it('should remove the trailing whitespace', () =>
    expect(parse(input)[3]).toBe('4'));

  it('should skip comments without the directive', () =>
    expect(parse(input).length).toBe(4));

  it('should silently return an empty array if input JS throws an error', () => {
    readAndParse('../../test/to-parse/to-parse-error.js', data =>
      expect(parse(data).length).toBe(0),
    );
  });

  it('should handle both commonjs and ES modules', () => {
    readAndParse('../../test/to-parse/to-parse-modules.js', data =>
      expect(parse(data).length).toBe(1),
    );
  });

  it('should handle jsx', () => {
    readAndParse('../../test/to-parse/to-parse-jsx.js', data =>
      expect(parse(data).length).toBe(1),
    );
  });
});
