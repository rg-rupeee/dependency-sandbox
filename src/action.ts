import inquirer from 'inquirer';
import Logger from './utils/logger.js';
import { MODES } from './constants.js';
import { ModeFactory } from './modes/Factory.js';

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
  const sandbox = ModeFactory.createMode(config.mode);
  Logger.blue(`Starting ${config.mode} mode...`);
  sandbox.run(packages);
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
