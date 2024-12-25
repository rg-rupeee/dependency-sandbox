import chalk from 'chalk';

class Logger {
  // Utility to stringify objects with proper indentation
  static stringifyObj(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  // Helper to format the message (handles both string and object)
  private static formatMessage(message: string | object): string {
    return typeof message === 'string' ? message : Logger.stringifyObj(message);
  }

  // Specific method for logging Error objects
  static logError(error: Error, printStack: boolean = true): void {
    const errorDetails = {
      name: error.name,
      message: error.message,
      ...(printStack && {
        stack: error.stack?.split('\n').map((line) => line.trim()),
      }),
    };

    console.log(chalk.red(Logger.stringifyObj(errorDetails)));
  }

  // Informational Logs
  static info(message: string | object): void {
    console.log(
      chalk.blackBright('[INFO]') +
        ' ' +
        chalk.bold(Logger.formatMessage(message))
    );
  }

  static warn(message: string | object): void {
    console.log(
      chalk.yellowBright('[WARN]') +
        ' ' +
        chalk.bold(Logger.formatMessage(message))
    );
  }

  static error(message: string | object): void {
    console.log(
      chalk.redBright('[ERROR]') +
        ' ' +
        chalk.bold(Logger.formatMessage(message))
    );
  }

  static success(message: string | object): void {
    console.log(
      chalk.greenBright('[SUCCESS]') +
        ' ' +
        chalk.bold(Logger.formatMessage(message))
    );
  }

  static debug(message: string | object): void {
    console.log(
      chalk.magentaBright('[DEBUG]') +
        ' ' +
        chalk.bold(Logger.formatMessage(message))
    );
  }

  // Color styles
  static blue(message: string | object): void {
    console.log(chalk.blue(Logger.formatMessage(message)));
  }

  static yellow(message: string | object): void {
    console.log(chalk.yellow(Logger.formatMessage(message)));
  }

  static red(message: string | object): void {
    console.log(chalk.red(Logger.formatMessage(message)));
  }

  static green(message: string | object): void {
    console.log(chalk.green(Logger.formatMessage(message)));
  }

  static magenta(message: string | object): void {
    console.log(chalk.magenta(Logger.formatMessage(message)));
  }

  static cyan(message: string | object): void {
    console.log(chalk.cyan(Logger.formatMessage(message)));
  }

  // Additional text styles
  static bold(message: string | object): void {
    console.log(chalk.bold(Logger.formatMessage(message)));
  }

  static italic(message: string | object): void {
    console.log(chalk.italic(Logger.formatMessage(message)));
  }

  static underline(message: string | object): void {
    console.log(chalk.underline(Logger.formatMessage(message)));
  }

  // Background colors
  static bgRed(message: string | object): void {
    console.log(chalk.bgRed(Logger.formatMessage(message)));
  }

  static bgBlue(message: string | object): void {
    console.log(chalk.bgBlue(Logger.formatMessage(message)));
  }

  static bgGreen(message: string | object): void {
    console.log(chalk.bgGreen(Logger.formatMessage(message)));
  }

  static bgMagenta(message: string | object): void {
    console.log(chalk.bgMagenta(Logger.formatMessage(message)));
  }

  static bgCyan(message: string | object): void {
    console.log(chalk.bgCyan(Logger.formatMessage(message)));
  }

  static bgYellow(message: string | object): void {
    console.log(chalk.bgYellow(Logger.formatMessage(message)));
  }

  // Combination styles
  static boldUnderline(message: string | object): void {
    console.log(chalk.bold.underline(Logger.formatMessage(message)));
  }

  static italicUnderline(message: string | object): void {
    console.log(chalk.italic.underline(Logger.formatMessage(message)));
  }

  static boldItalic(message: string | object): void {
    console.log(chalk.bold.italic(Logger.formatMessage(message)));
  }

  static bgBlueBold(message: string | object): void {
    console.log(chalk.bgBlue.bold(Logger.formatMessage(message)));
  }

  static bgGreenItalic(message: string | object): void {
    console.log(chalk.bgGreen.italic(Logger.formatMessage(message)));
  }
}

export default Logger;
