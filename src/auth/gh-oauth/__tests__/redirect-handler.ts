import createHandler from '../redirect-handler';

jest.mock('config');

describe('createHandler()', () => {
  const onSuccess = jest.fn(() => {
    return;
  });
  const onEnd = jest.fn(() => {
    return;
  });

  const ctx = {request: {query: {code: 1, state: '1'}}, body: ''};

  let successHandler: any;
  let failHandler: any;

  beforeAll(() => {
    successHandler = createHandler('1', onSuccess, onEnd);
    failHandler = jest.fn(createHandler('2', onSuccess, onEnd));
  });

  test('should call onEnd() on success and fail', async () => {
    await successHandler(ctx as any);
    expect(onEnd).toBeCalled();

    onEnd.mockReset();

    try {
      await failHandler(ctx as any);
    } catch {
      null;
    }
    expect(onEnd).toBeCalled();
  });

  test('should only call onSuccess() when the token is received', async () => {
    await successHandler(ctx as any);
    expect(onSuccess).toBeCalledWith('a');

    onSuccess.mockReset();

    try {
      await failHandler(ctx as any);
    } catch {
      null;
    }

    expect(onSuccess).not.toBeCalled();
  });

  test('should throw if the id and the state does not match', async () => {
    try {
      await failHandler(ctx as any);
    } catch {
      null;
    }

    await expect(failHandler).rejects.toBeTruthy();
  });
});
