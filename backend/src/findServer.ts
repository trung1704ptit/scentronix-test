import axios, { AxiosResponse } from 'axios';
import { IServer } from './interfaces/server';
import { SERVERS } from './__mocks__/servers';
import { REQUEST_TIMEOUT } from './utils/constants';

async function isServerOnline(server: IServer): Promise<boolean> {
  try {
    const response: AxiosResponse = await axios.get(server.url, { timeout: REQUEST_TIMEOUT });
    return response.status >= 200 && response.status < 300; // 200-299, it is considered online.
  } catch (error) {
    return false;
  }
}

export async function findServer(): Promise<IServer> {
  // loop through all servers, checking online status for each one.
  const checkServers = SERVERS.map(async (server) => ({
    server,
    online: await isServerOnline(server),
  }));

  const results = await Promise.all(checkServers); // run in parallel

  const onlineServers = results
    .filter(result => result.online)
    .map(result => result.server)
    .sort((a, b) => a.priority - b.priority);

  if (onlineServers.length > 0) {
    return onlineServers[0];
  } else {
    throw new Error("No servers are online");
  }
}