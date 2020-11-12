import {authenticate, logout} from 'auth';
import config from 'config';
import * as ghOauth from '../gh-oauth';

jest.mock('../gh-oauth');

describe('authenticate()', () => {
  const oauthSpy = jest.spyOn(ghOauth, 'default');
  const configSpy = jest.spyOn(config.store, 'getAccessToken');

  test('should do nothing if there is an existing token', async () => {
    await authenticate();

    expect(oauthSpy).not.toBeCalled();
  });

  test('should start the oauth flow if there is no token', async () => {
    configSpy.mockImplementation(() => '');

    await authenticate();

    expect(oauthSpy).toBeCalledTimes(1);
  });
});

describe('logout()', () => {
  const configSpy = jest
    .spyOn(config.store, 'deleteAccessToken')
    .mockImplementation(() => null);

  test('should delete the token', () => {
    logout();

    expect(configSpy).toBeCalledTimes(1);
  });
});
