import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import {AddressInfo} from 'net';
import createHandler from './redirect-handler';

/**
 * Starts the `koa` server, returns the port and listens for a request from Github. The passed in ID will be
 * compared by the handler to the response to secure the process. Server times out after 3 minutes.
 *
 * @param id to compare to the redirect state
 * @returns port of the server and the app instance
 * @callback onSuccess will be called with the token
 */
export default function startServer(
  id: string,
  onSuccess: (token: string) => unknown,
): {port: number; app: Koa} {
  // the koa app will start listening on a free port and the address of the app will be
  // sent to Github as the redirect URI.
  const app = new Koa();
  const router = new Router();

  router.get(
    '/',
    createHandler(id, onSuccess, () => {
      clearTimeout(timer);
      server.close();
    }),
  );

  app.use(helmet());
  app.use(bodyParser());
  app.use(router.routes());

  // 0 means starting on a random free port
  const server = app.listen(0);

  // server times out after 3 minutes.
  const timer = setTimeout(() => {
    server.close();

    throw new Error('Server timeout.');
  }, 180000);

  return {port: (<AddressInfo>server.address()).port, app};
}
