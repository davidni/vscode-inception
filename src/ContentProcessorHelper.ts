'use strict';

import { IContentProcessor } from "./IContentProcessor"
import ComputationState from "./ComputationState"
import Base64Processor from "./Processors/Base64Processor"
import EncodedUriProcessor from "./Processors/EncodedUriProcessor"
import JsonProcessor from "./Processors/JsonProcessor"
import JsonStringProcessor from "./Processors/JsonStringProcessor"
import JSTimestampProcessor from "./Processors/JSTimestampProcessor"
import JwtTokenProcessor from "./Processors/JwtTokenProcessor"
import UnixTimestampProcessor from "./Processors/UnixTimestampProcessor"
import UriProcessor from "./Processors/UriProcessor"

export default class ContentProcessorHelper {
	private _processors: IContentProcessor[];

	constructor() {
		this._processors = [
			new Base64Processor(),
			new EncodedUriProcessor(),
			new JsonProcessor(),
			new JsonStringProcessor(),
			new JSTimestampProcessor(),
			new JwtTokenProcessor(),
			new UnixTimestampProcessor(),
			new UriProcessor(),
		];
	}

	public process(rawText: string): { outputText: string, headerLineNumbers: number[] } {
		if (!rawText)
			throw "Empty text";

		const state = new ComputationState(rawText);
		let scores: {
			processor: IContentProcessor,
			score: number
		}[] = [];
		for (const processor of this._processors) {
			const score = processor.computeQuickScore(state);
			if (score > 0) {
				scores.push({
					processor: processor,
					score: score
				});
			}
		}

		// Sort by descending scores
		scores.sort((a, b) => b.score - a.score);

		let res = "";
		let line = 0;
		let headerLines: number[] = [];
		for (const result of scores) {
			try {
				let output = result.processor.process(state);
				const toAppend =
					`>> ${result.processor.name}\n` +
					`${output}\n\n\n`;
				headerLines.push(line);
				line += toAppend.split('\n').length - 1;
				res += toAppend;
			} catch (e) { }
		}
		// Remove the 2 extra line breaks
		if (res)
			res = res.substring(0, res.length - 2);

		return {
			outputText: res,
			headerLineNumbers: headerLines
		}
	}
}
