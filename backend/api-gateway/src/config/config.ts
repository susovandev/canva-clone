import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
  env: String(process.env.NODE_ENV) || 'DEVELOPMENT',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: String(process.env.DATABASE_URL),
  services: {
    designServiceUrl:
      String(process.env.DESIGN_SERVICE_URL) || 'http://localhost:3001',
    uploadServiceUrl:
      String(process.env.UPLOAD_SERVICE_URL) || 'http://localhost:3002',
    subscriptionServiceUrl:
      String(process.env.SUBSCRIPTION_SERVICE_URL) || 'http://localhost:3003',
  },
  googleClientId: process.env.GOOGLE_CLIENT_ID,
};

export const config = Object.freeze(_config);
