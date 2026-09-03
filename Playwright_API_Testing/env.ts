import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.API_KEY?.trim();

if (!apiKey) {
  throw new Error('API_KEY must be set in .env or the process environment.');
}

export const environment = {
  apiKey,
} as const;