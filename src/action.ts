import inquirer from 'inquirer';
import { ReplMode } from './modes/ReplMode.js';
import Logger from './utils/logger.js';
import PlaygroundMode from './modes/PlaygroundMode.js';

export const MODES = {
  REPL: 'repl',
  PLAYGROUND: 'playground',
};

async function promptUser() {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'Select the execution mode:',
      choices: Object.values(MODES),
      default: MODES.REPL,
    },
  ]);
}

interface IConfig {
  mode: string;
}

async function executeStrategy(packages: string[], config: IConfig) {
  if (config.mode === MODES.REPL) {
    Logger.blue('Starting REPL mode...');
    const sandbox = new ReplMode();
    await sandbox.run(packages);
  } else if (config.mode === MODES.PLAYGROUND) {
    Logger.blue('Starting Playground mode...');
    const sandbox = new PlaygroundMode();
    await sandbox.run(packages);
  } else {
    Logger.error('Invalid mode specified.');
    process.exit(1);
  }
}

export const action = async (packages: string[], options: any) => {
  const config: IConfig = {
    mode: options.mode,
  };

  if (options.default) {
    Logger.info('Using default values...');
    config.mode = MODES.REPL;
  }

  if (!config.mode) {
    const answers = await promptUser();
    config.mode = answers.mode;
  }

  executeStrategy(packages, config);
};
