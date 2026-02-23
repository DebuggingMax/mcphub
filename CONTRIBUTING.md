# Contributing to MCP Hub

First off, thank you for considering contributing to MCP Hub! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs what actually happened
- **Environment details** (OS, Node.js version, etc.)
- **Error messages** or screenshots if applicable

### 💡 Suggesting Features

Feature requests are welcome! Please:

- Check if the feature has already been requested
- Describe the feature and why it would be useful
- Provide examples of how it would work

### 🔧 Pull Requests

1. Fork the repo and create your branch from `main`
2. Install dependencies: `npm install`
3. Make your changes
4. Add tests for any new functionality
5. Run tests: `npm test`
6. Run linting: `npm run lint`
7. Commit with a clear message
8. Push and open a PR

### 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new search filter
fix: resolve config path issue
docs: update README examples
test: add registry tests
chore: update dependencies
```

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/mcphub.git
cd mcphub

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Link for local testing
npm link

# Now you can run `mcphub` anywhere
mcphub --help
```

## Project Structure

```
mcphub/
├── src/
│   ├── cli.ts          # CLI entry point
│   ├── index.ts        # Library exports
│   ├── commands/       # CLI commands
│   ├── lib/            # Core logic
│   ├── types/          # TypeScript types
│   └── utils/          # Utilities
├── tests/              # Test files
├── docs/               # Documentation
└── examples/           # Example usage
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Questions?

Feel free to open an issue or reach out on [Discord](https://discord.gg/mcphub).

Thank you for contributing! 🙏
