import config from 'config';
import ghOAuth from './gh-oauth';

/**
 * Checks if the user is already logged in and starts the login process if they are not.
 */
export async function authenticate(): Promise<void> {
  if (!config.store.token) {
    await ghOAuth();
  }
}

/**
 * Logs the user out.
 */
export function logout(): void {
  config.store.clearAccessToken();
}
