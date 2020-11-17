import * as execa from 'execa';
import {IssueCreate, IssueUpdate} from 'issues/types';
import {getOperations, getOrigin} from '../helpers';

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

describe('getOperations()', () => {
  let operations: {
    toCreate: IssueCreate[];
    toUpdate: IssueUpdate[];
    toClose: IssueUpdate[];
  };

  beforeAll(() => {
    operations = getOperations(
      [
        {text: '1', location: ''},
        {text: '2', location: ''},
      ],
      [
        {title: 'a', state: 'open', number: 1, labels: [], body: ''},
        {title: '1', state: 'closed', number: 2, labels: [], body: ''},
      ],
    );
  });

  test('should return issues to create', () => {
    expect(operations.toCreate).toMatchInlineSnapshot(`
      Array [
        Object {
          "body": "Generated automatically by [ismet](https://www.github.com/otanriverdi/ismetjs) 🐙

      Seen on 
      ",
          "title": "2",
        },
      ]
    `);
  });

  test('should return issues to close', () => {
    expect(operations.toClose).toMatchInlineSnapshot(`
      Array [
        Object {
          "number": 1,
        },
      ]
    `);
  });

  test('should return issues to open', () => {
    expect(operations.toUpdate).toMatchInlineSnapshot(`
      Array [
        Object {
          "number": 2,
          "updates": Object {
            "body": "Generated automatically by [ismet](https://www.github.com/otanriverdi/ismetjs) 🐙

      Seen on 
      ",
          },
        },
      ]
    `);
  });
});
