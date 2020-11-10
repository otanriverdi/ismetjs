import fs from 'fs';
import path from 'path';
import parse from '../parse';

describe('Parser', () => {
  let input: string;

  beforeAll(() => {
    return new Promise(res => {
      fs.readFile(
        path.join(__dirname, '../../test/to-parse/to-parse.js'),
        'utf-8',
        (_, data) => {
          input = data;
          res();
        },
      );
    });
  });

  it('should parse opening/closing comments', () => {
    const res = parse(input);

    expect(res[0]).toBe('1');
  });

  it('should parse block comments', () => {
    const res = parse(input);

    expect(res[1]).toBe('2');
  });

  it('should keep spaces in a sentence', () => {
    const res = parse(input);

    expect(res[2]).toBe('3 sentence');
  });

  it('should remove the trailing whitespace', () => {
    const res = parse(input);

    expect(res[3]).toBe('4');
  });

  it('should skip comments without the directive', () => {
    const res = parse(input);

    // test file has 5 comments (1 without directive)
    expect(res.length).toBe(4);
  });

  it('should silently return an empty array if input JS throws an error', () => {
    fs.readFile(
      path.join(__dirname, '../../test/to-parse/to-parse-error.js'),
      'utf-8',
      (err, data) => {
        const res = parse(data);

        expect(res.length).toBe(0);
      },
    );
  });

  it('should handle both commonjs and ES modules', () => {
    fs.readFile(
      path.join(__dirname, '../../test/to-parse/to-parse-modules.js'),
      'utf-8',
      (err, data) => {
        const res = parse(data);

        expect(res.length).toBe(1);
      },
    );
  });
});
