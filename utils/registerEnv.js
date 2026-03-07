import { configDotenv } from 'dotenv';

const env = process.env.NODE_ENV || 'prod';
switch (env) {
  case 'dev':
    configDotenv({ path: '.env.dev' });
    break;
  case 'prod':
    configDotenv({ path: '.env.prod' });
    break;
  default:
    throw new Error(`Unknown environment: ${env}`);
}
