import ora, { Ora } from 'ora';
import { resolve } from 'path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export interface IMode {
  run(packageNames: string[]): Promise<void>;
}

export abstract class BaseMode implements IMode {
  protected spinner: Ora;
  protected workingDir: string;

  constructor() {
    this.spinner = ora();
    this.workingDir = resolve(process.cwd());
  }

  abstract run(packageNames: string[]): Promise<void>;

  protected async installDependency(name: string): Promise<void> {
    this.spinner.start(`Installing ${name}`);
    try {
      await execAsync(`npm install ${name}`);
      this.spinner.succeed(`Installed ${name}`);
    } catch (error) {
      this.spinner.fail(`Failed to install ${name}`);
      throw error;
    }
  }
}
