import pino from 'pino';
import config from 'config';

const name = config.get<string>('name');
const level = config.get<string>('logLevel');

export const logger = pino({
  name,
  level,
  prettyPrint: true
});