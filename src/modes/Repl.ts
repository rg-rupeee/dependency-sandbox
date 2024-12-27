import chalk from 'chalk';
import { start } from 'node:repl';
import { createRequire } from 'node:module';
import { BaseMode } from './Base.js';
import Logger from '../utils/logger.js';
import path from 'node:path';

export class Repl extends BaseMode {
  constructor() {
    super();
  }

  private createREPL(packageNames: string[]): void {
    Logger.green('\nStarting REPL with loaded dependencies:');
    packageNames.forEach((pkg) => {
      Logger.blue(` - ${pkg}`);
    });

    const sandboxRequire = createRequire(
      path.join(this.workingDir, 'node_modules/')
    );

    const loadedDependencies: Record<string, any> = {};
    for (const pkg of packageNames) {
      console.log(pkg);
      loadedDependencies[pkg] = sandboxRequire(pkg);
    }

    const replServer = start({
      prompt: chalk.yellow('sandbox> '),
      useColors: true,
    });

    Object.entries(loadedDependencies).forEach(([name, module]) => {
      replServer.context[name] = module;
    });

    replServer.context.require = sandboxRequire;
  }

  async run(packageNames: string[]): Promise<void> {
    try {
      await this.createWorkspace();
      await this.installDependencies(packageNames);

      this.createREPL(packageNames);
    } catch (error: any) {
      Logger.error('Error occurred while creating REPL Enviorment');
      Logger.logError(error);
      process.exit(1);
    }
  }
}

export default Repl;
