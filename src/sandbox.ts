import path from 'path';
import fs from 'fs-extra';

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createSandbox(dependencies: string[]) {
  const sandboxDir = path.resolve(__dirname, '../__sandbox__');

  try {
    Logger.blue('Creating Sandbox...');

    // Ensuring a clean directory for sandbox
    fs.emptyDirSync(sandboxDir);

    // Initializing a new package.json
    fs.writeFileSync(
      path.join(sandboxDir, 'package.json'),
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

    // Installing dependencies
    Logger.blue('Installing Dependencies');
    execSync(`npm install ${dependencies.join(' ')}`, {
      cwd: sandboxDir,
      stdio: 'inherit',
    });

    Logger.green('Dependencies installed successfully');

    Logger.magenta(`Sandbox ready at ${sandboxDir}`);
  } catch (error: any) {
    Logger.error('Failed to create sandbox');
    Logger.logError(error);
  }
}
