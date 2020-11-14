import startServer from '../server';

jest.useFakeTimers();

describe('OAuth server', () => {
  const app = startServer('1', () => null).app;

  test('should listen to a random port', async () => {
    expect(app.listen).toBeCalledWith(0);
  });

  test('should start a timeout', () => {
    expect(setTimeout).toBeCalledWith(expect.any(Function), 180000);
  });
});
