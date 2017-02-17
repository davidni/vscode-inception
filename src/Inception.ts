'use strict';

import { workspace, languages, window, commands, ExtensionContext, Disposable, OverviewRulerLane, Range, Position } from 'vscode';
import InceptionContentProvider from './InceptionContentProvider';

export function activate(context: ExtensionContext) {

	const provider = new InceptionContentProvider();

	const providerRegistrations = Disposable.from(
		workspace.registerTextDocumentContentProvider(InceptionContentProvider.scheme, provider),
	);

	const commandRegistration = commands.registerTextEditorCommand('editor.inception.dive', async editor => {
		const text = editor.document.getText(editor.selection);
		if (text.length > 50000) {
			await window.showErrorMessage("Selection is too large for Inception.");
			return;
		}

		let viewColumn = editor.viewColumn;
		if (editor.document.uri.scheme !== InceptionContentProvider.scheme)
			viewColumn += 1;

		const uri = InceptionContentProvider.encodeContent(text);
		const doc = await workspace.openTextDocument(uri);
		const newEditor = await window.showTextDocument(doc, viewColumn);

		var inceptionDocument = provider.findDocument(uri);
		if (!inceptionDocument)
			return;

		const decor = window.createTextEditorDecorationType({
			isWholeLine: true,
			overviewRulerLane: OverviewRulerLane.Full,
			textDecoration: "underline",
			light: {
				backgroundColor: "rgba(255,128,0,.2)",
			},
			dark: {
				backgroundColor: "rgba(255,255,0,.2)",
			}
		});
		var ranges: Range[] = [];
		for (let headerLineNumber of inceptionDocument.headerLineNumbers) {
			ranges.push(new Range(new Position(headerLineNumber, 0), new Position(headerLineNumber, 0)));
		}
		newEditor.setDecorations(decor, ranges);
	});

	context.subscriptions.push(
		provider,
		commandRegistration,
		providerRegistrations
	);
}
