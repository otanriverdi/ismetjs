import axios from 'axios';
import config from 'config';
import {Issue, Repo} from './types';

const {store, ghApiURL} = config;

/**
 * Class to interface with the Github API.
 */
class GithubApiClient {
  token;
  client;

  constructor() {
    this.token = store.getAccessToken();

    if (!this.token) {
      throw new Error('Access token not found');
    }

    this.client = axios.create({
      headers: {
        Authorization: `token ${this.token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      baseURL: ghApiURL,
    });
  }

  /**
   * Gets all repos with explicit permissions for the logged in user
   *
   * @returns repos
   */
  async getUserRepos(): Promise<Repo[]> {
    const results = await this.client.get(`/user/repos`);

    return results.data as Repo[];
  }

  /**
   * Gets all issues of the provided repo.
   *
   * @param repo
   * @returns issues
   */
  async getIssues(repo: string): Promise<Issue[]> {
    const results = await this.client.get(
      `/repos/${repo}/issues?labels=ismet&state=all`,
    );

    return results.data as Issue[];
  }
}

export default GithubApiClient;
