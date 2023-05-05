import { window } from "vscode";

const logLevels = {
  info: "INFO",
  error: "ERROR",
  debug: "DEBUG",
} as const;

type LogLevel = (typeof logLevels)[keyof typeof logLevels];

export class Logger {
  private outputChannel = window.createOutputChannel(
    "VSCE_DOC_FORMATTING_SAMPLE"
  );

  public logInfo(message: string) {
    this.appendToChannel(message, logLevels.info);
  }

  public logDebug(message: string) {
    this.appendToChannel(message, logLevels.debug);
  }

  public logError(message: string) {
    this.appendToChannel(message, logLevels.error);
  }

  private appendToChannel(message: string, logLevel: LogLevel) {
    const title = new Date().toLocaleTimeString();
    this.outputChannel.appendLine(`["${logLevel}" - ${title}] ${message}`);
  }
}
