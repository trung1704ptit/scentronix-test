import axios from 'axios';
import { findServer } from '../findServer';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('findServer', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls after each test
  });

  it('should return the online server with the lowest priority', async () => {
    // Mock implementation for axios.get
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === 'https://gitlab.com') {
        return Promise.resolve({ status: 200 });
      } else {
        return Promise.reject(new Error('Network Error'));
      }
    });

    const server = await findServer();
    expect(server.url).toBe('https://gitlab.com');
    expect(server.priority).toBe(4);
  });

  it('should throw an error if no servers are online', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(findServer()).rejects.toThrow('No servers are online');
  });

  it('should respect priority and return the server with the lowest priority when multiple are online', async () => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url === 'https://gitlab.com' || url === 'http://app.scnt.me') {
        return Promise.resolve({ status: 200 });
      }
      return Promise.reject(new Error('Network Error'));
    });

    const server = await findServer();
    expect(server.url).toBe('http://app.scnt.me');
    expect(server.priority).toBe(3);
  });
});