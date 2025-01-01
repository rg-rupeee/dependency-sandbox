# **Depxbox: Test Dependencies Without the Hassle**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Depxbox** is a handy tool that makes testing npm packages super quick and easy. Whether you're trying out a new library or just need to debug something, depxbox takes care of the setup so you can jump straight into testing.

## **How It Works**

Want to explore the `moment` library? Just run:

```bash
npx depxbox -d moment
```

That’s it! This command opens a terminal session where `moment` is already loaded. You can instantly try out methods, experiment, and see results right away.

Here’s how you can add this example to demonstrate using `moment` in a Node.js REPL session:

#### **Using `moment` in Node.js REPL Session**

```bash
sandbox> moment()                         // REPL session will have access to moment object
Moment<2025-01-01T17:09:02+05:30>

sandbox> moment().format()                // Format the current date and time as a string
'2025-01-01T17:09:14+05:30'

sandbox> moment().startOf('day')          // Get the start of the current day (midnight)
Moment<2025-01-01T00:00:00+05:30>
```

This example showcases how you can use `moment` for quick date manipulations directly within a REPL session.

## **Why Use Depxbox?**

- **Instant Setup:** It creates a sandboxed environment with your chosen dependency, so you don’t have to mess with your existing project.
- **Built-in REPL Mode:** Spin up a terminal session with the dependency preloaded. Test things out in real time without writing extra boilerplate code.
- **Safe to Use:** Play around with packages risk-free—your current project stays untouched.

## **Who Can Use Depxbox?**

- Curious developers exploring new npm packages.
- Teams debugging dependency issues without cluttering their repo.
- Anyone who loves a quick and clean way to test libraries.

Stop wasting time setting things up manually. With depxbox, you get a ready-to-go environment in seconds.

### **Try It Out**

```bash
npx depxbox -d <dependency-name>
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
[GitHub Repository](https://github.com/rg-rupeee/depxbox)

## Author

Created by [Rupesh Garhwal](mailto:rupeshgarhwal3920@gmail.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy sandboxing your dependencies with **Depxbox**!
