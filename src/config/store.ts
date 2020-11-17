import Conf from 'conf';

/**
 * Handles the store created on users system using the `conf` package.
 */
export default class Store {
  private conf = new Conf();
  private _token;

  constructor() {
    this._token =
      process.env.GITHUB_TOKEN ||
      (this.conf.get(`access_token`) as string | undefined);

    if (process.env.CI && !process.env.GITHUB_TOKEN) {
      throw new Error(
        'The environment variable `GITHUB_TOKEN` is required in CI environment.',
      );
    }
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
