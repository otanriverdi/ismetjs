import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import {AddressInfo} from 'net';
import createHandler from './redirect-handler';

/**
 * Starts the `koa` server, returns the port and listens for a request from Github. Executes the `onSuccess`
 * callback once the access token is received. The passed in ID will be compared by the handler to the response
 * to secure the process. Server times out after 3 minutes.
 *
 * @param {string} id uuid
 * @callback onSuccess
 */
export default function startServer(
  id: string,
  onSuccess: (token: string) => unknown,
): {port: number; app: Koa} {
  // the koa app will start listening on a free port and the address of the app will be
  // sent to Github as the redirect URI.
  const app = new Koa();

  app.use(helmet());
  app.use(bodyParser());
  app.use(
    createHandler(id, onSuccess, () => {
      clearTimeout(timer);
      server.close();
    }),
  );

  const server = app.listen(0);

  // server times out after 3 minutes.
  const timer = setTimeout(() => {
    server.close();

    throw new Error('Timeout on authentication reached.');
  }, 180000);

  return {port: (<AddressInfo>server.address()).port, app};
}