import path from 'path';
import parse from '../';

describe('Parser', () => {
  let results: string[];

  beforeAll(async () => {
    const data = await parse(path.join(__dirname, '../../test/to-parse'));

    results = data;
  });

  test('should parse the directory and retrieve `ismet` comments', () => {
    expect(results.length).toBe(6);
    expect(results[3]).toBe('2');
  });

  test('should reject with errors', async () => {
    await expect(
      parse(path.join(__dirname, '../../asda')),
    ).rejects.toBeTruthy();
  });
});
