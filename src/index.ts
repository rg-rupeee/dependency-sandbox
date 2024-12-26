import { Command } from 'commander';
import inquirer from 'inquirer';
import { REPLSandbox } from './repl.js';
import { createSandbox } from './sandbox.js';

const program = new Command();

program
  .name('dependency-sandbox')
  .description('Test npm dependencies in a REPL or Detached environment')
  .argument('<packages...>', 'npm package names to install and test')
  .option('-m, --mode <type>', 'execution mode: repl or detached') // Optional mode flag
  .option('-d, --default', 'use all default values and skip prompts') // Default mode flag
  .action(async (packages: string[], options) => {
    let mode = options.mode;

    if (options.default) {
      // Use default values
      console.log('Using default values...');
      mode = 'repl'; // Default mode
    } else if (!mode) {
      // Prompt the user for mode if not provided
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'mode',
          message: 'Select the execution mode:',
          choices: ['repl', 'detached'],
          default: 'repl',
        },
      ]);
      mode = answers.mode;
    }

    if (mode === 'repl') {
      console.log('Starting in REPL mode...');
      const sandbox = new REPLSandbox();
      await sandbox.start(packages);
    } else if (mode === 'detached') {
      console.log('Starting in Detached mode...');
      await createSandbox(packages);
    } else {
      console.error('Invalid mode specified.');
      process.exit(1);
    }
  });

program.parse();
