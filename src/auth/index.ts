import config from 'config';
import ghOAuth from './gh-oauth';

/**
 * Checks the local store for an existing access token for this directory and starts the OAuth flow if the
 * token doesn't exist.
 */
export async function authenticate(): Promise<void> {
  if (!config.store.getAccessToken()) {
    await ghOAuth();
  }
}

/**
 * Logs the user out by deleting their saved info.
 */
export function logout(): void {
  config.store.deleteAccessToken();
}
