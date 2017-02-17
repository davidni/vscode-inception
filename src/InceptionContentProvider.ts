'use strict';

import * as vscode from 'vscode';
import InceptionDocument from './InceptionDocument';
import ContentProcessorHelper from './ContentProcessorHelper';

export default class InceptionContentProvider implements vscode.TextDocumentContentProvider {

	static scheme = 'inception';

	private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
	private _documents = new Map<string, InceptionDocument>();
	private _subscriptions: vscode.Disposable;
	private _helper = new ContentProcessorHelper();

	constructor() {
		this._subscriptions = vscode.workspace.onDidCloseTextDocument(doc => this._documents.delete(doc.uri.toString()));
	}

	dispose() {
		this._subscriptions.dispose();
		this._documents.clear();
		this._onDidChange.dispose();
	}

	get onDidChange() {
		return this._onDidChange.event;
	}

	provideTextDocumentContent(uri: vscode.Uri): string | Thenable<string> {
		let document = this._documents.get(uri.toString());
		if (document) {
			return document.value;
		}

		document = new InceptionDocument(this._helper, uri);
		this._documents.set(uri.toString(), document);
		return document.value;
	}

	public findDocument(uri: vscode.Uri): InceptionDocument {
		return this._documents.get(uri.toString());
	}

	static _seq = 0;
	public static encodeContent(content: string): vscode.Uri {
		const buffer = new Buffer(content);
		const base64 = buffer.toString("base64");

		return vscode.Uri.parse(`${InceptionContentProvider.scheme}:document?${base64}#${InceptionContentProvider._seq++}`);
	}

	public static decodeContent(uri: vscode.Uri): string {
		try {
			const base64 = uri.query;
			const buffer = new Buffer(base64, "base64");
			const content = buffer.toString("utf8");
			return content;
		} catch (e) {
			return "An error occurred: " + e;
		}
	}
}
