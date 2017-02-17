'use strict';

import * as vscode from 'vscode';
import InceptionContentProvider from './InceptionContentProvider'
import ContentProcessorHelper from './ContentProcessorHelper'

export default class InceptionDocument {
	private _helper: ContentProcessorHelper;
	private _outputText: string;
	private _headerLineNumbers: number[];

	constructor(helper: ContentProcessorHelper, uri: vscode.Uri) {
		this._helper = helper;

		const content = InceptionContentProvider.decodeContent(uri);
		var res = helper.process(content);
		this._outputText = res.outputText;
		this._headerLineNumbers = res.headerLineNumbers;
	}

	get value(): string {
		return this._outputText;
	}

	get headerLineNumbers(): number[] {
		return this._headerLineNumbers;
	}
}
