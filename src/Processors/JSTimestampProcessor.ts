'use strict';

import { IContentProcessor } from '../IContentProcessor';
import ComputationState from '../ComputationState';

export default class JSTimestampProcessor implements IContentProcessor {
	private readonly _min = 0;
	private readonly _max = 4294967295 * 1000;
	private readonly _monthDuration = 3600 * 24 * 30 * 1000;
	private readonly _yearDuration = 3600 * 24 * 365 * 1000;
	private readonly _tenYearDuration = 3600 * 24 * 365 * 10 * 1000;

	public get name(): string {
		return "JS Timestamp";
	}

	public computeQuickScore(state: ComputationState): number {
		const trimmedText = state.trimmedText;
		if (trimmedText.length > 13)
			return 0;
		const num = this.toMillisecondsTimestamp(state.number);
		if (isNaN(num) || num < this._min || num > this._max)
			return 0;
		const now = new Date().getTime();
		const absDelta = Math.abs(now - num);
		return (
			absDelta < this._monthDuration ? 100 :
				absDelta < this._yearDuration ? 95 :
					absDelta < this._tenYearDuration ? 90 :
						80);
	}

	public process(state: ComputationState): string {
		const num = this.toMillisecondsTimestamp(state.number);
		const date = new Date(num);

		const res =
			`Local time:     ${date.toString()}\n` +
			`UTC:            ${date.toUTCString()}\n` +
			`ISO:            ${date.toISOString()}\n` +
			`Unix timestamp: ${Math.floor(num / 1000)}`;
		return res;
	}

	protected toMillisecondsTimestamp(num: number) {
		return num;
	}
}
