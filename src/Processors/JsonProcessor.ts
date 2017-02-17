'use strict';

import { IContentProcessor } from '../IContentProcessor';
import ComputationState from '../ComputationState';

export default class JsonProcessor implements IContentProcessor {
	public get name(): string {
		return "JSON";
	}

	public computeQuickScore(state: ComputationState): number {
		const trimmedText = state.trimmedText;
		if (trimmedText.startsWith("{") && trimmedText.endsWith("}"))
			return 100;
		if (trimmedText.startsWith("[") && trimmedText.endsWith("]"))
			return 80;
		return 0;
	}

	public process(state: ComputationState): string {
		try {
			const obj = JSON.parse(state.rawText);
			return JSON.stringify(obj, null, 4);
		} catch (e) {
			throw "Invalid JSON";
		}
	}
}
