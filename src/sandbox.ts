import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

export async function createSandbox(dependencies: string[]) {
  const sandboxDir = path.resolve(__dirname, '../__sandbox__');

  try {
    console.log('creating sandbox...');

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
    console.log('Installing Dependencies');
    execSync(`npm install ${dependencies.join(' ')}`, {
      cwd: sandboxDir,
      stdio: 'inherit',
    });

    console.log('Dependencies installed successfully');
    console.log(`Sandbox ready at ${sandboxDir}`);
  } catch (error) {
    console.log('Failed to create sandbox: ', error);
  }
}
