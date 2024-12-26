import chalk from 'chalk';
import ora from 'ora';
import { start } from 'node:repl';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const execAsync = promisify(exec);

interface PackageJson {
  dependencies: Record<string, string>;
}

export class REPLSandbox {
  private spinner: ora.Ora;
  private packageJsonPath: string;

  constructor() {
    this.spinner = ora();
    this.packageJsonPath = resolve(process.cwd(), 'package.json');
  }

  private async installDependency(name: string): Promise<void> {
    this.spinner.start(`Installing ${name}`);
    try {
      await execAsync(`npm install ${name}`);
      this.spinner.succeed(`Installed ${name}`);
    } catch (error) {
      this.spinner.fail(`Failed to install ${name}`);
      throw error;
    }
  }

  private updatePackageJson(name: string): void {
    const packageJson: PackageJson = existsSync(this.packageJsonPath)
      ? JSON.parse(readFileSync(this.packageJsonPath, 'utf-8'))
      : { dependencies: {} };

    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies[name] = '*';

    writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  private createREPL(dependencies: Record<string, any>): void {
    console.log(chalk.green('\nStarting REPL with loaded dependencies:'));
    Object.keys(dependencies).forEach((dep) => {
      console.log(chalk.blue(`- ${dep}`));
    });

    const replServer = start({
      prompt: chalk.yellow('sandbox> '),
      useColors: true,
    });

    Object.entries(dependencies).forEach(([name, module]) => {
      replServer.context[name] = module;
    });
  }

  async start(packageNames: string[]): Promise<void> {
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
    } catch (error) {
      console.error(chalk.red('Error:', error));
      process.exit(1);
    }
  }
}
