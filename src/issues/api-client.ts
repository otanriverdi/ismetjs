import axios from 'axios';
import config from 'config';
import {Issue, IssueCreate, IssueUpdate, Repo} from './types';

const {store, ghApiURL} = config;

/**
 * Class to interface with the Github API.
 */
class GithubApiClient {
  token: string | undefined;
  client;

  constructor() {
    this.token = store.token;

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
    const results = await this.client.get<Repo[]>(`/user/repos`);

    return results.data;
  }

  /**
   * Gets all issues of the provided repo.
   *
   * @param repo
   * @returns issues
   */
  async getIssues(repo: string): Promise<Issue[]> {
    const results = await this.client.get<Issue[]>(
      `/repos/${repo}/issues?labels=ismet&state=all`,
    );

    return results.data;
  }

  /**
   * Create issue with the label `ismet` on the provided repo.
   *
   * @param title
   * @param repo
   */
  async createIssue(issue: IssueCreate, repo: string): Promise<void> {
    await this.client.post(`/repos/${repo}/issues`, {
      ...issue,
      labels: ['ismet'],
    });
  }

  /**
   * Toggles the issue on the provided repo.
   *
   * @param number number of the issue on github
   * @param state
   * @param repo
   */
  async editIssue(
    issue: IssueUpdate,
    repo: string,
    state: 'open' | 'closed' = 'open',
  ): Promise<void> {
    await this.client.patch(`/repos/${repo}/issues/${issue.number}`, {
      ...issue.updates,
      state,
    });
  }
}

export default GithubApiClient;
