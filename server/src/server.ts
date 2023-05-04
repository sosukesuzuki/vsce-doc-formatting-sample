import {
  InitializeResult,
  ProposedFeatures,
  createConnection,
} from "vscode-languageserver/node";

const connection = createConnection(ProposedFeatures.all);

connection.onInitialize(() => {
  const result: InitializeResult = {
    capabilities: {
      documentFormattingProvider: true,
      documentRangeFormattingProvider: true,
    },
  };
  return result;
});

connection.listen();
