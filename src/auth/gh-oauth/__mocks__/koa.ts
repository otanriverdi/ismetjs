export default class Koa {
  listen = jest.fn(() => ({
    address: jest.fn(() => ({port: 0})),
    close: jest.fn(),
  }));
  use = jest.fn();
}
