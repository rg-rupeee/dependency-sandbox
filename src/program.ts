import { Command } from 'commander';
import { action } from './action.js';

const program = new Command();

export function bootstrap() {
  program
    .name('dependency-sandbox')
    .description(
      'Test npm dependencies in a REPL session or Playground environment'
    )
    .argument('<packages...>', 'npm package names to install and test')
    .option('-m, --mode <type>', 'execution mode: repl or playground')
    .option('-d, --default', 'use all default values and skip prompts')
    .action(action);

  program.parse();
}
