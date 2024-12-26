import { BaseMode } from './Base.js';
import Logger from '../utils/logger.js';

export class Playground extends BaseMode {
  constructor() {
    super();
  }

  private createPlayground(packageNames: string[]): void {
    Logger.green('\nCreating Playground with installed dependencies:');
    packageNames.forEach((pkg) => {
      Logger.blue(` - ${pkg}`);
    });

    Logger.magenta(`Sandbox ready at ${this.workingDir}`);
  }

  async run(packageNames: string[]): Promise<void> {
    try {
      await this.createWorkspace();
      await this.installDependencies(packageNames);

      this.createPlayground(packageNames);
    } catch (error: any) {
      Logger.error('Error occurred while creating Playground Enviorment');
      Logger.logError(error);
      process.exit(1);
    }
  }
}

export default Playground;
