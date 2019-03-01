'use strict';

import {NodeCG} from '../types/nodecg';

let context: NodeCG;

/** Gets the current NodeCG context
 * @return {NodeCG} Current NodeCG context
 */
export function get(): NodeCG {
	return context;
}

/** Sets the current NodeCG context
 *  @param {NodeCG} ctx NodeCG context
 */
export function set(ctx: NodeCG): void {
	context = ctx;
}
