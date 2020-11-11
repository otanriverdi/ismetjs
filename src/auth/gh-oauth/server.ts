import axios from 'axios';
import config from 'config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import {AddressInfo} from 'net';

const {store} = config;

/**
 * Starts the `koa` server, returns the port and listens for a request from Github. Executes the callback
 * with the access token. The passed in ID will be compared to the response to secure the process.
 *
 * @param {string} id uuid
 * @callback callback
 */
export default function startServer(
  id: string,
  callback: (token: string) => unknown,
): number {
  // the koa app will start listening on a free port and the address of the app will be
  // sent to Github as the redirect URI.
  const app = new Koa();

  app.use(helmet());
  app.use(bodyParser());

  app.use(async ctx => {
    const {code, state} = ctx.request.query;

    if (code && state === id) {
      // see functions/README.md to understand why we don't make a request to Github API
      const response = await axios.get(
        `https://us-central1-ismetjs.cloudfunctions.net/token?code=${code}`,
      );

      const {access_token} = response.data;

      if (access_token) {
        store.setAccessToken(access_token);

        ctx.body = '🐙 Done! Go back to your terminal';

        // the server needs to close as soon as we have the auth token.
        server.close();

        return callback(access_token);
      }
    }

    ctx.body =
      '🐙 There was an error authenticating. Check the logs for more details.';
    throw new Error('Github OAuth failed.');
  });

  const server = app.listen(0);

  return (<AddressInfo>server.address()).port;
}
