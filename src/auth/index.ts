import config from 'config';
import ghOAuth from './gh-oauth';

/**
 * Checks the local store for an existing access token for this directory and starts the OAuth flow if the
 * token doesn't exist.
 */
export async function authenticate(): Promise<void> {
  if (!config.store.getAuthToken()) {
    await ghOAuth();
  }
}
