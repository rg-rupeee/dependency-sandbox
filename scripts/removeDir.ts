import * as shell from 'shelljs';

// Get folder names from the command line arguments (all arguments after the script name)
const folderNames = process.argv.slice(2);

if (folderNames.length === 0) {
  console.error('Please provide at least one folder name to remove.');
  process.exit(1); // Exit with error code if no folder names are provided
}

// Remove each specified folder
folderNames.forEach((folderName) => {
  shell.rm('-R', folderName);
  console.log(`Successfully removed the folder: ${folderName}`);
});
