import createIssues from 'issues';
import * as helpers from '../helpers';

jest.mock(
  '../api-client',
  () =>
    class ApiClient {
      getUserRepos() {
        return ['no/no'];
      }
    },
);
jest.mock('axios');

describe('Issues', () => {
  const spies = {
    getOrigin: jest.spyOn(helpers, 'getOrigin'),
  };

  test('should only accep github origins', async () => {
    spies.getOrigin.mockImplementation(() => 'gitlab.com:test/test' as any);

    await expect(createIssues([])).rejects.toMatchInlineSnapshot(
      `[Error: Currently ismet only supports Github repos!]`,
    );
  });

  test('should only accept repos with explicit permissions', async () => {
    spies.getOrigin.mockImplementation(() => 'github.com:test/test' as any);

    await expect(createIssues([])).rejects.toMatchInlineSnapshot(
      `[Error: You dont have explicit permissions for this repo. Use \`--logout\` to logout.]`,
    );
  });
});
