'use strict';

import ComputationState from "./ComputationState"

export interface IContentProcessor {
	name: string;

	computeQuickScore(state: ComputationState): number;
	process(state: ComputationState): string;
}
