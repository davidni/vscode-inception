'use strict';

export default class ComputationState {
	private _rawText: string;
	private _histogram: number[];
	private _trimmedHistogram: number[];
	private _trimmedText: string = undefined;
	private _parsedJson: any = undefined;
	private _number: number = undefined;

	constructor(rawText: string) {
		if (!rawText)
			throw "rawText cannot be empty";
		this._rawText = rawText;
	}

	public get rawText(): string {
		return this._rawText;
	}

	public get trimmedText(): string {
		if (this._trimmedText === undefined)
			this._trimmedText = this._rawText.trim();
		return this._trimmedText;
	}

	public get parsedJson(): any {
		// TODO: Avoid re-parsing if we know it throws.
		if (this._parsedJson === undefined)
			this._parsedJson = JSON.parse(this._rawText);
		return this._parsedJson;
	}

	public get number(): any {
		if (this._number === undefined)
			this._number = +this._rawText;
		return this._number;
	}

	public get histogram(): number[] {
		if (!this._histogram)
			this._histogram = this._computeHistogram(this._rawText);
		return this._histogram;
	}

	public get trimmedHistogram(): number[] {
		if (!this._trimmedHistogram)
			this._trimmedHistogram = this._computeHistogram(this.trimmedText);
		return this._trimmedHistogram;
	}

	private _computeHistogram(text: string): number[] {
		let histogram = new Array(255);
		for (let i = 0; i <= 255; i++)
			histogram[i] = 0;

		const len = text.length;
		for (let i = 0; i < len; i++) {
			const c = text.charCodeAt(i);
			if (c >= 0 && c <= 255) {
				histogram[c]++;
			}
		}

		return histogram;
	}
}
