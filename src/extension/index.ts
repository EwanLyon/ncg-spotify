'use strict';
// Ours
import {NodeCG} from '../../../../types/server'

/** All requires for extensions */
async function init(): Promise<void> {
	require('./spotify');
}

module.exports = (nodecg: NodeCG) => {
	init().then(() => {
		nodecg.log.info('Initialization successful.');
	}).catch((error) => {
		nodecg.log.error('Failed to initialize:', error);
	});
};
