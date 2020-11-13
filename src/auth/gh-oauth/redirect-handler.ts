import axios from 'axios';
import config from 'config';
import Koa from 'koa';

const {store} = config;

/**
 * Returns the router handler for Github OAuth server. Compares the passed in id with the state that was sent and
 * makes the final post request to get the access token. Calls the `onSuccess` callback with the token and calls
 * the `onEnd` callback when the execution end even if it errors.
 *
 * @param {string} id state that was sent
 * @callback onSuccess will be called with token
 * @callback onEnd will be called once the execution ends
 */
export default function createHandler(
  id: string,
  onSuccess: (token: string) => unknown,
  onEnd: () => unknown,
) {
  return async (ctx: Koa.ParameterizedContext): Promise<void> => {
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

          ctx.body =
            '<h1>🐙 You are in! You can close this tab and go back to your terminal.<h1>';

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

      throw new Error('Github OAuth failed. Please try again.');
    }
  };
}
