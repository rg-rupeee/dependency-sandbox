# Depxbox

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Depxbox is a lightweight CLI tool to test npm dependencies in a REPL session or a Playground environment. Quickly spin up a sandboxed environment for any npm package and experiment without impacting your current project.

## Features

- **REPL Mode**: Evaluate dependencies interactively in a REPL.
- **Playground Mode**: Create a temporary workspace to test dependencies.
- **Flexible Installation**: Specify custom installation paths.
- **Default Mode**: Skip prompts and use default settings for a streamlined experience.

## Installation

Depxbox can be used directly via `npx`. No installation is required:

```bash
npx depxbox <packages...>
```

Or you can install it globally:

```bash
npm install -g dependency-sandbox
```

## Usage

### Basic Usage

Test npm packages interactively:

```bash
npx depxbox lodash axios
```

### Options

- `-m, --mode <type>`: Specify execution mode (`repl` or `playground`).
  ```bash
  npx depxbox lodash --mode playground
  ```

- `-p, --path <path>`: Set a custom path for installation.
  ```bash
  npx depxbox lodash --path ./sandbox
  ```

- `-d, --default`: Use all default settings and skip interactive prompts.
  ```bash
  npx depxbox lodash --default
  ```

## Examples

### REPL Mode

Run `lodash` in REPL mode:

```bash
npx depxbox lodash --mode repl
```

### Playground Mode

Create a sandbox to test `axios` in a separate directory:

```bash
npx depxbox axios --mode playground --path ./test-env
```

## Repository

Check out the source code or contribute at:
[GitHub Repository](https://github.com/rg-rupeee/dependency-sandbox)

## Author

Created by [Rupesh Garhwal](mailto:rupeshgarhwal3920@gmail.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy sandboxing your dependencies with **Depxbox**!
