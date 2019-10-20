/**
 * @author ibraim alibay <ibraim.alibay@gmail.com>
 */

import { logger } from './utils/logger';
import { knex } from './utils/knex';
import { parseZdorov } from './parsers/zdorov';
import { parseAptekamos } from './parsers/aptekamos';
import { parseAptekanika } from './parsers/aptekanika';
import { parseDialog } from './parsers/dialog';
import { parseStolichki } from './parsers/stolichki';
import { parseAsna } from './parsers/asna';

(async function() {
  try {
    logger.info('Launch crawlers');

    await Promise.all([
        parseZdorov(),
        parseAptekamos(),
        parseAptekanika(),
        parseDialog(),
        parseAsna(),
        parseGorzdrav(),
        parseStolichki(),
    ]);

  } catch (err) {
    logger.error(err);
  } finally {
    logger.info('Finish');
    knex.destroy();
  }
}());