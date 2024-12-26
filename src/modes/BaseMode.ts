import ora, { Ora } from 'ora';
import { resolve } from 'path';
import fs from 'fs-extra';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import Logger from '../utils/logger.js';

export interface IMode {
  run(packageNames: string[]): Promise<void>;
}

const execAsync = promisify(exec);

export interface PackageJson {
  dependencies: Record<string, string>;
}

export abstract class BaseMode implements IMode {
  protected spinner: Ora;
  protected workingDir: string;

  constructor() {
    this.spinner = ora();
    this.workingDir = path.join(resolve(process.cwd()), '__sandbox__');
  }

  abstract run(packageNames: string[]): Promise<void>;

  protected async createWorkspace() {
    this.spinner.start('Creating sandbox...');
    try {
      fs.emptyDirSync(this.workingDir);

      // Initializing a new package.json
      fs.writeFileSync(
        path.join(this.workingDir, 'package.json'),
        JSON.stringify(
          {
            name: 'sandbox',
            description: 'dependency test sandbox enviorment',
            version: '1.0.0',
          },
          null,
          2
        )
      );

      this.spinner.succeed('Sandbox created successfully.');
    } catch (error: any) {
      this.spinner.fail('Failed to create sandbox');
      throw error;
    }
  }

  protected async installDependencies(dependencies: string[]): Promise<void> {
    Logger.blue('Installing Dependencies...');
    for (const dependency of dependencies) {
      await this.installDependency(dependency);
    }
  }

  protected async installDependency(name: string): Promise<void> {
    this.spinner.start(`Installing ${name}`);
    try {
      await execAsync(`npm install ${name}`, {
        cwd: this.workingDir,
      });
      this.spinner.succeed(`Installed ${name}`);
    } catch (error: any) {
      this.spinner.fail(`Failed to install ${name}`);
      throw error;
    }
  }
}
