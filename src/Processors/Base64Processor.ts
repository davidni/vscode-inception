'use strict';

import { IContentProcessor } from '../IContentProcessor';
import ComputationState from '../ComputationState';

export default class Base64Processor implements IContentProcessor {
	public get name(): string {
		return "Base64";
	}

	public computeQuickScore(state: ComputationState): number {
		const histogram = state.trimmedHistogram;
		for (let i = 0; i <= 255; i++) {
			if (histogram[i] === 0)
				continue;

			const expected =
				(i >= "A".charCodeAt(0) && i <= "Z".charCodeAt(0)) ||
				(i >= "a".charCodeAt(0) && i <= "z".charCodeAt(0)) ||
				(i >= "0".charCodeAt(0) && i <= "9".charCodeAt(0)) ||
				(i === "=".charCodeAt(0)) ||
				(i === "+".charCodeAt(0)) ||
				(i === "/".charCodeAt(0)) ||
				(i === "-".charCodeAt(0)) ||
				(i === "_".charCodeAt(0));
			if (!expected)
				return 0;
		}

		return 90;
	}

	public process(state: ComputationState): string {
		try {
			const base64 = state.trimmedText;
			const buffer = new Buffer(base64, "base64");
			const content = buffer.toString("utf8");
			return content;
		} catch (e) {
			throw "Invalid base64";
		}
	}
}
