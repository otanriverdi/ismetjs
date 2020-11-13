import axios from 'axios';
import config from 'config';

/**
 * Class to interface with the Github API.
 */
class GithubApiClient {
  token;
  client;

  constructor() {
    this.token = config.store.getAccessToken();

    if (!this.token) {
      throw new Error('Access token not found');
    }

    this.client = axios.create({
      headers: {
        Authorization: `token ${this.token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      baseURL: 'https://api.github.com',
    });
  }

  /**
   * Gets all repos with explicit permissions for the logged in user
   */
  async getUserRepos() {
    const results = await this.client.get(`/user/repos`);

    return results.data as any[];
  }

  /**
   * Gets all issues of the provided repo.
   *
   * @param repo
   */
  async getIssues(repo: string) {
    const results = await this.client.get(`/repos/${repo}/issues?labels=ismet`);

    return results.data as any[];
  }
}

export default GithubApiClient;
