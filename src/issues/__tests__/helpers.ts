import * as execa from 'execa';
import {getOrigin} from '../helpers';

describe('getOrigin()', () => {
  const execaSpy = jest.spyOn(execa, 'default');

  test('should return the origin', async () => {
    const repo = await getOrigin();
    expect(repo).toBe('github.com:otanriverdi/ismetjs.git');
  });

  test('should execute the correct shell command', () => {
    expect(execaSpy).toBeCalledWith('git', [
      'config',
      '--get',
      'remote.origin.url',
    ]);
  });

  test('should throw if the shell command exits with an error code', async () => {
    execaSpy.mockImplementation(() => {
      throw '';
    });

    await expect(getOrigin()).rejects.toBe('');
  });

  test('should throw if the origin is not a git link', async () => {
    execaSpy.mockImplementation(() => ({stdout: 'test'} as any));

    await expect(getOrigin()).rejects.toThrow(
      "Couldn't retrieve the origin repo",
    );
  });
});
