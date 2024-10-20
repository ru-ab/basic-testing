// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  return {
    create: jest.fn(),
  };
});

describe('throttledGetDataFromApi', () => {
  const relativePath = 'relativePath';
  const data = 'data';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockAxios = () => {
    const get = jest.fn().mockResolvedValueOnce({ data });
    (axios.create as jest.Mock).mockReturnValue({ get });

    return { get };
  };

  const runAction = async () => {
    const result = await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    return result;
  };

  test('should create instance with provided base url', async () => {
    mockAxios();

    await runAction();

    expect(axios.create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const { get } = mockAxios();

    await runAction();

    expect(get).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    mockAxios();

    const result = await runAction();

    expect(result).toEqual(data);
  });
});
