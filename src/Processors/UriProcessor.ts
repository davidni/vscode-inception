'use strict';

import { IContentProcessor } from '../IContentProcessor';
import ComputationState from '../ComputationState';

export default class UriProcessor implements IContentProcessor {
	public get name(): string {
		return "URI";
	}

	public computeQuickScore(state: ComputationState): number {
		const trimmedText = state.trimmedText;
		if (trimmedText.startsWith("http://") || trimmedText.startsWith("https://"))
			return 100;
		return 0;
	}

	public process(state: ComputationState): string {
		try {
			const trimmedText = state.trimmedText;
			const queryPos = trimmedText.indexOf("?");
			const hashPos = trimmedText.indexOf("#", queryPos + 1);
			let query = "";
			if (queryPos > 0) {
				if (hashPos > 0)
					query = trimmedText.substring(queryPos + 1, hashPos);
				else
					query = trimmedText.substring(queryPos + 1);
			}
			let hash = "";
			if (hashPos > 0)
				hash = trimmedText.substring(hashPos + 1);

			let stemEnd = trimmedText.length;
			if (queryPos > 0)
				stemEnd = queryPos;
			else if (hashPos > 0)
				stemEnd = hashPos;
			const stem = trimmedText.substring(0, stemEnd);

			let res = `Stem: ${stem}`;
			if (query) {
				const queryParams = query.split("&");
				res += "\nQuery:";
				for (const queryParam of queryParams) {
					let eqPos = queryParam.indexOf("=");
					let name = "";
					let value = "";
					if (eqPos > 0) {
						name = decodeURIComponent(queryParam.substring(0, eqPos));
						value = decodeURIComponent(queryParam.substring(eqPos + 1));
					} else {
						name = decodeURIComponent(queryParam);
					}

					res += `\n   ${name}=${value}`
				}
			}

			if (hash) {
				const hashParams = hash.split("&");
				res += "\nHash:";
				for (const hashParam of hashParams) {
					let eqPos = hashParam.indexOf("=");
					let name = "";
					let value = "";
					if (eqPos > 0) {
						name = decodeURIComponent(hashParam.substring(0, eqPos));
						value = decodeURIComponent(hashParam.substring(eqPos + 1));
					} else {
						name = decodeURIComponent(hashParam);
					}

					res += `\n   ${name}=${value}`
				}
			}

			return res;
		} catch (e) {
			throw "Invalid JSON";
		}
	}
}
