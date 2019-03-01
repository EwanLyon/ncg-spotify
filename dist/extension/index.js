'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const nodecgApiContext = require("./nodecg-api-context");
/** All requires for extensions */
async function init() {
    require('./spotify');
}
module.exports = (nodecg) => {
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
//# sourceMappingURL=index.js.map