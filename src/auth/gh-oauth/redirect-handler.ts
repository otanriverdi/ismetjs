import axios from 'axios';
import config from 'config';
import Koa from 'koa';
import * as html from './html';

const {store, accessTokenURL} = config;

/**
 * Generates the router handler for Github OAuth server. Compares the passed in id with the state that was sent and
 * makes the final post request to get the access token.
 *
 * @param id state that was sent
 * @returns route handler
 * @callback onSuccess will be called with the access token
 * @callback onEnd will be called once the execution ends
 */
export default function createHandler(
  id: string,
  onSuccess: (token: string) => unknown,
  onEnd: () => unknown,
) {
  return async (ctx: Koa.ParameterizedContext): Promise<void> => {
    // we return a single error to the user for all server errors for security
    try {
      const {code, state} = ctx.request.query;

      if (code && state === id) {
        const response = await axios.get(`${accessTokenURL}?code=${code}`);

        const {access_token} = response.data;

        if (access_token) {
          store.setAccessToken(access_token);

          ctx.body = html.success;

          onEnd();
          onSuccess(access_token);

          return;
        }
      }

      throw new Error('Invalid request.');
    } catch (error) {
      ctx.body = html.failure;

      onEnd();

      throw new Error(
        'Github OAuth failed. Your token might be revoked or expired. Run `--logout` to reset.',
      );
    }
  };
}
