# Quick Start Guide

## Installation

```bash
# Install from GitHub
npm install -g "git+https://github.com/DebuggingMax/mcphub.git"
```

## First Steps

### 1. Search for Servers
```bash
mcphub search github
mcphub search --category devtools
```

### 2. Install a Server
```bash
mcphub install @official/github
```

### 3. Configure Environment Variables
Some servers need API keys:
```bash
export GITHUB_TOKEN="your-token"
mcphub install @official/github
```

### 4. Verify Installation
```bash
mcphub list
mcphub doctor
```

### 5. Use in Claude
Restart Claude Desktop and your new MCP servers are ready!

## Common Commands

| Command | Description |
|---------|-------------|
| `mcphub search <query>` | Find servers |
| `mcphub install <name>` | Install a server |
| `mcphub list` | Show installed servers |
| `mcphub info <name>` | Server details |
| `mcphub enable <name>` | Enable a server |
| `mcphub disable <name>` | Disable a server |
| `mcphub uninstall <name>` | Remove a server |
| `mcphub doctor` | Check your setup |
