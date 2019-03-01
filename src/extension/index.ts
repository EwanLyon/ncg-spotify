'use strict';

import * as nodecgApiContext from './nodecg-api-context';
import {NodeCGServer} from '../../../../types/lib/nodecg-instance';

/** All requires for extensions */
async function init(): Promise<void> {
	require('./spotify');
}

module.exports = (nodecg: NodeCGServer) => {
	/** Store a reference to this nodecg API context
	 * in a place where other libs can easily access it.
	 * This must be done before any other files are`require`d.*/
	nodecgApiContext.set(nodecg);

	init().then(() => {
		nodecg.log.info('Initialization successful.');
	}).catch((error) => {
		nodecg.log.error('Failed to initialize:', error);
	});
};
