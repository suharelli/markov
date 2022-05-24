export type ENV_VARS = {
  NODE_ENV: 'dev' | 'stage' | 'prod';
  PORT: string;
  WS_PORT: string;
  RABBIT_URL: string;
  TYPEORM_PORT: string;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_DATABASE: string;
  TYPEORM_HOST: string;
  TYPEORM_CONNECTION: string;
};
