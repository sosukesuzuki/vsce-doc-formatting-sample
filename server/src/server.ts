import { TextDocument } from "vscode-languageserver-textdocument";
import {
  InitializeResult,
  ProposedFeatures,
  Range,
  TextDocumentSyncKind,
  TextDocuments,
  TextEdit,
  createConnection,
} from "vscode-languageserver/node";

const connection = createConnection(ProposedFeatures.all);

const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize(() => {
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      documentFormattingProvider: true,
    },
  };
  return result;
});

connection.onDocumentFormatting(async (params) => {
  const document = documents.get(params.textDocument.uri);
  if (document === undefined) {
    return [];
  }
  const text = document.getText();
  const pos0 = document.positionAt(0);
  const pos1 = document.positionAt(text.length);
  return [TextEdit.replace(Range.create(pos0, pos1), text.toUpperCase())];
});

documents.listen(connection);

connection.listen();
