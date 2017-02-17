'use strict';

import { IContentProcessor } from '../IContentProcessor';
import ComputationState from '../ComputationState';

export default class EncodedUriProcessor implements IContentProcessor {
	public get name(): string {
		return "Encoded URI";
	}

	public computeQuickScore(state: ComputationState): number {
		const trimmedText = state.trimmedText;
		if (!trimmedText.startsWith("http"))
			return 0;

		for (const c of trimmedText) {
			const v = c.charCodeAt(0);
			if ((v >= "A".charCodeAt(0) && v <= "Z".charCodeAt(0)) ||
				(v >= "a".charCodeAt(0) && v <= "z".charCodeAt(0)) ||
				(v >= "0".charCodeAt(0) && v <= "9".charCodeAt(0)) ||
				c === "-" ||
				c === "." ||
				c === "_" ||
				c === "~" ||
				c === "%") {
				continue;
			}

			// Unsafe characters found, so it's not a properly-encoded uri
			return 0;
		}
		return 50;
	}

	public process(state: ComputationState): string {
		try {
			const trimmedText = state.trimmedText;
			const res = decodeURI(trimmedText);
			return res;
		} catch (e) {
			throw "Invalid JSON";
		}
	}
}
