'use strict';

import { IContentProcessor } from '../IContentProcessor';
import ComputationState from '../ComputationState';

export default class JwtTokenProcessor implements IContentProcessor {
	public get name(): string {
		return "JWT token";
	}

	public computeQuickScore(state: ComputationState): number {
		const histogram = state.trimmedHistogram;
		if (histogram[".".charCodeAt(0)] !== 2)
			return 0;
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
				(i === "_".charCodeAt(0)) ||
				(i === ".".charCodeAt(0));
			if (!expected)
				return 0;
		}

		return 90;
	}

	public process(state: ComputationState): string {
		try {
			const parts = state.trimmedText.split(".");
			if (parts.length !== 3)
				throw "";
			const res =
				`Header:    ${parts[0]}\n` +
				`Payload:   ${parts[1]}\n` +
				`Signature: ${parts[2]}`;
			return res;
		} catch (e) {
			throw "Invalid base64";
		}
	}
}
