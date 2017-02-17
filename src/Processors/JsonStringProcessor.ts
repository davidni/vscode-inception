'use strict';

import { IContentProcessor } from '../IContentProcessor';
import ComputationState from '../ComputationState';

export default class JsonStringProcessor implements IContentProcessor {
	public get name(): string {
		return "JSON string";
	}

	public computeQuickScore(state: ComputationState): number {
		const trimmedText = state.trimmedText;
		if (trimmedText.startsWith("\"") && trimmedText.endsWith("\""))
			return 100;
		return 0;
	}

	public process(state: ComputationState): string {
		try {
			var result = JSON.parse(state.rawText);
			if (typeof result === "string")
				return result;
		} catch (e) {
		}
		throw "Invalid JSON String";
	}
}
