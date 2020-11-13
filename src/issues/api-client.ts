import axios from 'axios';
import config from 'config';
import {Issue, Repo} from './types';

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
  async getUserRepos(): Promise<Repo[]> {
    const results = await this.client.get(`/user/repos`);

    return results.data as Repo[];
  }

  /**
   * Gets all issues of the provided repo.
   *
   * @param repo
   */
  async getIssues(repo: string): Promise<Issue[]> {
    const results = await this.client.get(
      `/repos/${repo}/issues?labels=ismet&state=all`,
    );

    return results.data as Issue[];
  }
}

export default GithubApiClient;
