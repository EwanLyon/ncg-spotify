'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
let context;
/** Gets the current NodeCG context
 * @return {NodeCG} Current NodeCG context
 */
function get() {
    return context;
}
exports.get = get;
/** Sets the current NodeCG context
 *  @param {NodeCG} ctx NodeCG context
 */
function set(ctx) {
    context = ctx;
}
exports.set = set;
//# sourceMappingURL=nodecg-api-context.js.map