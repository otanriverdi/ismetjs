import acorn from '../acorn';

describe('acorn()', () => {
  it('should parse js and detect comments', () => {
    acorn('//test', (_, text) => {
      expect(text).toBe('test');
    });
  });
});
