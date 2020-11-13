import {authenticate, logout} from 'auth';
import config from 'config';
import * as ghOauth from '../gh-oauth';

describe('authenticate()', () => {
  const oauthSpy = jest
    .spyOn(ghOauth, 'default')
    .mockImplementation(async () => {
      return;
    });
  const configSpy = jest
    .spyOn(config.store, 'getAccessToken')
    .mockImplementation(() => 'a');

  test('should do nothing if the user is logged in', async () => {
    await authenticate();

    expect(oauthSpy).not.toBeCalled();
  });

  test('should start the login process if the user is not logged in', async () => {
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
