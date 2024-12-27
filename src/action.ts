import inquirer from 'inquirer';
import Logger from './utils/logger.js';
import { MODES } from './constants.js';
import { ModeFactory } from './modes/Factory.js';
import { IConfig } from './modes/Base.js';

type Prompts = keyof IConfig;

async function promptUser(prompt: Prompts): Promise<string> {
  switch (prompt) {
    case 'mode':
      const { mode } = await inquirer.prompt({
        type: 'list',
        name: 'mode',
        message: 'Select the execution mode:',
        choices: Object.values(MODES),
        default: MODES.REPL,
      });
      return mode;

    case 'path':
      const { path } = await inquirer.prompt({
        type: 'input',
        name: 'path',
        message: 'Enter the path:',
        default: '.',
      });
      return path;

    default:
      return '';
  }
}

async function executeStrategy(packages: string[], config: IConfig) {
  const sandbox = ModeFactory.createMode(config);
  Logger.blue(`Starting ${config.mode} mode...`);
  sandbox.run(packages);
}

export const action = async (packages: string[], options: any) => {
  const config: IConfig = {
    mode: options.mode,
    path: options.path,
  };

  if (options.default) {
    Logger.info('Using default values...');
    config.mode = MODES.REPL;
    config.path = '.';
  }

  if (!config.mode) {
    const answer = await promptUser('mode');
    config.mode = answer;
  }

  if (!config.path) {
    const answer = await promptUser('path');
    config.path = answer;
  }

  executeStrategy(packages, config);
};
