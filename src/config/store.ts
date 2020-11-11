import Conf from 'conf';

/**
 * Handles the store created on users system using the `conf` package. The store property specific to the project
 * will have the cwd as the key.
 */
export default class Store {
  private conf = new Conf();

  // TODO better way?
  private confId = process.cwd();

  /**
   * Saves the auth token to the store..
   *
   * @param {string} token
   */
  setAccessToken(token: string): void {
    this.conf.set(`${this.confId}.access_token`, token);
  }

  /**
   * Gets the auth token saved inside the store.
   */
  getAuthToken(): string {
    return this.conf.get(`${this.confId}.access_token`) as string;
  }
}
