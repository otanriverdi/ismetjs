import axios from 'axios';
import config from 'config';
import Koa from 'koa';
import {html} from './success';

const {store} = config;

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
        // see functions/README.md to understand why we don't make a request to Github API
        const response = await axios.get(
          `https://us-central1-ismetjs.cloudfunctions.net/token?code=${code}`,
        );

        const {access_token} = response.data;

        if (access_token) {
          store.setAccessToken(access_token);

          ctx.body = html;

          onEnd();
          onSuccess(access_token);

          return;
        }
      } else {
        throw new Error('Invalid state');
      }
    } catch (error) {
      ctx.body =
        '<h1 style="color:red;">🐙 Oh no! There was an error authenticating. Check the logs for more details.</h1>';

      onEnd();

      throw new Error(
        'Github OAuth failed. Your token might be revoked or expired. Run `--logout` to reset.',
      );
    }
  };
}
