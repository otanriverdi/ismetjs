import config from 'config';
import open from 'open';
import {v4 as uuidv4} from 'uuid';
import startServer from './server';

const {ghClientID, store, ghOAuthURL} = config;

/**
 * Starts the Github OAuth flow. Resolves when the process is complete and the access token will be available
 * through the `config`.
 */
export default async function ghOAuth(): Promise<void> {
  return new Promise(resolve => {
    const id = uuidv4();

    const {port} = startServer(id, token => {
      store.setAccessToken(token);

      resolve();
    });

    open(
      `${ghOAuthURL}/?client_id=${ghClientID}&redirect_uri=http://localhost:${port}&state=${id}`,
    );
  });
}
