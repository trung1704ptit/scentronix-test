import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { findServer } from './findServer';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/find-server', async (req: Request, res: Response) => {
  try {
    const onlineServer = await findServer();
    res.status(200).json({
      message: 'Online server found',
      server: onlineServer,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      message: 'No servers are online',
      error: errorMessage,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});