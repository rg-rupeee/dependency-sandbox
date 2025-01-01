# **Depxbox: Test Dependencies Quickly**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Depxbox** is a handy tool that makes testing npm packages super quick and easy. Whether you're trying out a new library or just need to debug something, depxbox takes care of the setup so you can jump straight into testing.

## **How It Works**

Want to explore the `moment` library? Just run:

```bash
npx depxbox moment -d
```

That’s it! This command opens a terminal session where `moment` is already loaded. You can instantly try out methods, experiment, and see results right away.

Here’s how you can add this example to demonstrate using `moment` in a Node.js REPL session:

#### **Using `moment` in Node.js REPL Session**

```bash
sandbox> moment()
Moment<2025-01-01T17:09:02+05:30>

sandbox> moment().format()
'2025-01-01T17:09:14+05:30'

sandbox> moment().startOf('day')
Moment<2025-01-01T00:00:00+05:30>
```

This example showcases how you can use `moment` for quick date manipulations directly within a REPL session.

#### Alternatively, to create a repo with all the dependencies, simply run:

```bash
npx depxbox moment -m playground
```

Depxbox will create a new repository with `moment` installed in directory.

## **Why Use Depxbox?**

- **Instant Setup:** It creates a sandboxed environment with your chosen dependency, so you don’t have to mess with your existing project.
- **Built-in REPL Mode:** Spin up a terminal session with the dependency preloaded. Test things out in real time without writing extra boilerplate code.
- **Create a Repo with All Dependencies:** You can also use depxbox to generate a repository with all the packages you want installed, making it easy to start a project.
- **Safe to Use:** Play around with packages risk-free—your current project stays untouched.

## **Who Can Use Depxbox?**

- Curious developers exploring new npm packages.
- Teams debugging dependency issues without cluttering their repo.
- Anyone who loves a quick and clean way to test libraries.

Stop wasting time setting things up manually. With depxbox, you get a ready-to-go environment in seconds.

### **Try It Out**

```bash
npx depxbox <dependency-name> -d
```

## Installation

Depxbox can be used directly via `npx`. No installation is required:

```bash
npx depxbox <packages...>
```

Or you can install it globally:

```bash
npm install -g depxbox
```

## Usage

### Basic Usage

Test npm packages interactively:

```bash
npx depxbox lodash axios
```

## Options

| Option              | Description                              | Example             |
| ------------------- | ---------------------------------------- | ------------------- |
| `-m, --mode <type>` | Set execution mode (`repl`/`playground`) | `--mode playground` |
| `-p, --path <path>` | Custom installation directory            | `--path ./sandbox`  |
| `-d, --default`     | Skip prompts, use defaults               | `--default`         |

## Examples

### REPL Mode

Run `lodash` in REPL mode:

```bash
npx depxbox lodash --mode repl
```

### Playground Mode

Create a sandbox to test `axios` in a separate directory:

```bash
npx depxbox lodash --mode playground
```

### Custom Installation Path

```bash
npx depxbox lodash --path ./sandbox --mode repl
```

### Default Config

```bash
npx depxbox lodash --default
```

## Repository

Check out the source code or contribute at:
[GitHub Repository](https://github.com/rg-rupeee/depxbox)

## Author

Created by [Rupesh Garhwal](mailto:rupeshgarhwal3920@gmail.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy sandboxing your dependencies with **Depxbox**!
