import chalk from 'chalk';
import { start } from 'node:repl';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { BaseMode } from './BaseMode.js';
import path from 'node:path';
import Logger from '../utils/logger.js';

const require = createRequire(import.meta.url);

interface PackageJson {
  dependencies: Record<string, string>;
}

export class ReplMode extends BaseMode {
  constructor() {
    super();
  }

  private updatePackageJson(name: string): void {
    console.log(this.workingDir);
    const packageJsonPath = path.join(this.workingDir, 'package.json');
    console.log(packageJsonPath);

    const packageJson: PackageJson = existsSync(packageJsonPath)
      ? JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      : { dependencies: {} };

    packageJson.dependencies = packageJson.dependencies || {};

    packageJson.dependencies[name] = '*';

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  private createREPL(dependencies: Record<string, any>): void {
    Logger.green('\nStarting REPL with loaded dependencies:');
    Object.keys(dependencies).forEach((dep) => {
      Logger.blue(` - ${dep}`);
    });

    const replServer = start({
      prompt: chalk.yellow('sandbox> '),
      useColors: true,
    });

    Object.entries(dependencies).forEach(([name, module]) => {
      replServer.context[name] = module;
    });
  }

  async run(packageNames: string[]): Promise<void> {
    try {
      for (const pkg of packageNames) {
        await this.installDependency(pkg);
        this.updatePackageJson(pkg);
      }

      const loadedDependencies: Record<string, any> = {};
      for (const pkg of packageNames) {
        loadedDependencies[pkg] = require(pkg);
      }

      this.createREPL(loadedDependencies);
    } catch (error: any) {
      Logger.error('Error occurred while creating REPL Enviorment');
      Logger.logError(error);
      process.exit(1);
    }
  }
}

export default ReplMode;
