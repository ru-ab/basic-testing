// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1);

    expect(setTimeout).toBeCalledWith(callback, 1);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1);
    expect(callback).not.toBeCalled();

    jest.runAllTimers();
    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 1);

    expect(setInterval).toBeCalledWith(callback, 1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByInterval(callback, 1);
    expect(callback).not.toBeCalled();

    for (let i = 0; i < 10; ++i) {
      jest.runOnlyPendingTimers();
      expect(callback).toBeCalledTimes(i + 1);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';

    await readFileAsynchronously(pathToFile);

    expect(join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'pathToFile';
    (existsSync as jest.Mock).mockReturnValueOnce(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'pathToFile';
    const fileContent = 'fileContent';
    (existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockResolvedValueOnce(fileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toEqual(fileContent);
  });
});
