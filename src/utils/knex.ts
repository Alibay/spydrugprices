import config from 'config';
import Knex, { Config } from 'knex';

const dbConfig = {
  client: 'mysql',
  version: '5.7',
  connection: config.get('database')
};

export const knex = Knex(dbConfig as Config);