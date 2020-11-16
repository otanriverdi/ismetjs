import config from 'config';
import open from 'open';
import {v4 as uuidv4} from 'uuid';
import startServer from './server';

const {ghClientID, store, ghOAuthURL, scope} = config;

/**
 * Starts the Github OAuth flow. Resolves when the process is complete and the access token will be available
 * through the `config`.
 */
export default async function ghOAuth(): Promise<void> {
  return new Promise(resolve => {
    // the state that will be sent to github to later compare with the state of the response
    // this is for security
    const id = uuidv4();

    // we start a local koa server to listen for github redirects
    const {port} = startServer(id, token => {
      store.token = token;

      resolve();
    });

    // opens the users browser on the github authorization page and sends the local koa server as the
    // redirect uri
    open(
      `${ghOAuthURL}/?client_id=${ghClientID}&redirect_uri=http://localhost:${port}&state=${id}&scope=${scope}`,
    );
  });
}
