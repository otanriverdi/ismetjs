import Conf from 'conf';

/**
 * Handles the store created on users system using the `conf` package. The store property specific to the project
 * will have the cwd as the key.
 */
export default class Store {
  private conf = new Conf();
  private _token;

  constructor() {
    this._token = this.conf.get(`access_token`) as string | undefined;
  }

  public get token(): string | undefined {
    return this._token;
  }

  public set token(token: string | undefined) {
    this.conf.set(`access_token`, token);
    this._token = token;
  }

  /**
   * Deletes the access token saved inside the store.
   */
  clearAccessToken(): void {
    this.conf.delete(`access_token`);
    this._token = undefined;
  }
}
