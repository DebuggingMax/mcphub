<div align="center">
  <img src="https://raw.githubusercontent.com/DebuggingMax/mcphub/main/assets/logo.svg" width="180" alt="MCP Hub Logo" />
  <h1>🔌 MCP Hub</h1>
  <p><strong>The MCP Server Marketplace — npm for AI Tools</strong></p>
  <p>Find, install, and manage MCP servers for Claude, ChatGPT, and beyond</p>
  
  [![npm version](https://img.shields.io/npm/v/mcphub?style=flat-square&color=blue)](https://www.npmjs.com/package/mcphub)
  [![Downloads](https://img.shields.io/npm/dm/mcphub?style=flat-square&color=green)](https://www.npmjs.com/package/mcphub)
  [![CI](https://img.shields.io/github/actions/workflow/status/DebuggingMax/mcphub/ci.yml?branch=main&style=flat-square&label=tests)](https://github.com/DebuggingMax/mcphub/actions/workflows/ci.yml)
  [![GitHub Stars](https://img.shields.io/github/stars/DebuggingMax/mcphub?style=flat-square&color=yellow)](https://github.com/DebuggingMax/mcphub)
  [![License](https://img.shields.io/badge/license-MIT-purple?style=flat-square)](LICENSE)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  
  <br />
  
  [📖 Documentation](docs/QUICKSTART.md) • [🎯 Examples](examples/) • [💬 Discord](https://discord.gg/mcphub) • [🏢 Enterprise](docs/ENTERPRISE.md)
  
  <br />
  
  <img src="https://raw.githubusercontent.com/DebuggingMax/mcphub/main/assets/demo.png" width="700" alt="MCP Hub Demo" />
</div>

---

## 🚀 Why MCP Hub?

**The Problem:** MCP (Model Context Protocol) is revolutionizing AI by letting LLMs use tools — but discovering and installing MCP servers is fragmented across GitHub, npm, and random blog posts.

**The Solution:** MCP Hub is the **central registry** for MCP servers. One command to search, install, and manage all your AI tools.

```bash
# Before: Hunt for servers, read docs, manually edit configs 😩
# After: One command ✨
mcphub install @official/github
```

<br />

## ⚡ Quick Start

```bash
# Install globally
npm install -g mcphub

# Search for servers
mcphub search github

# Install a server
mcphub install @official/github

# List installed servers
mcphub list

# Check your setup
mcphub doctor
```

**That's it.** MCP Hub automatically configures Claude Desktop for you.

<br />

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Find servers by name, category, or keywords |
| 📦 **One-Click Install** | Automatic Claude Desktop integration |
| 🏷️ **Categories** | DevTools, Productivity, AI, Data, and more |
| ✅ **Verified Publishers** | Trust official and community-verified servers |
| 📊 **Stats & Rankings** | Downloads, stars, and popularity metrics |
| 🔧 **Config Management** | Enable/disable servers without reinstalling |
| 🩺 **Doctor Command** | Diagnose issues with your MCP setup |
| 🎯 **JSON Output** | Scriptable with `--json` flag |

<br />

## 📦 Popular Servers

| Server | Description | Downloads |
|--------|-------------|-----------|
| [@official/github](https://github.com/modelcontextprotocol/servers) | GitHub integration - repos, issues, PRs | 50K+ |
| [@official/filesystem](https://github.com/modelcontextprotocol/servers) | Secure file system access | 75K+ |
| [@official/puppeteer](https://github.com/modelcontextprotocol/servers) | Browser automation | 35K+ |
| [@official/postgres](https://github.com/modelcontextprotocol/servers) | PostgreSQL database access | 42K+ |
| [@official/slack](https://github.com/modelcontextprotocol/servers) | Slack workspace integration | 28K+ |
| [@community/notion](https://github.com/makenotion/notion-mcp-server) | Notion workspace | 15K+ |
| [@community/linear](https://github.com/jerhadf/linear-mcp-server) | Linear issue tracking | 8K+ |

[Browse all servers →](https://mcphub.dev)

<br />

## 📖 Commands

### Search & Discover

```bash
# Search by keyword
mcphub search github
mcphub search "file system"

# Filter by category
mcphub search --category devtools
mcphub search --category productivity

# Show only verified servers
mcphub search --verified

# List all categories
mcphub categories
```

### Install & Manage

```bash
# Install a server
mcphub install @official/github

# Install without prompts
mcphub install @official/github --yes

# Uninstall a server
mcphub uninstall @official/github

# List installed servers
mcphub list
mcphub list --enabled
```

### Enable & Disable

```bash
# Disable without uninstalling
mcphub disable @official/github

# Re-enable
mcphub enable @official/github
```

### Info & Stats

```bash
# Detailed server info
mcphub info @official/github

# Hub statistics
mcphub stats

# Check your setup
mcphub doctor
```

### Output Formats

```bash
# JSON output for scripting
mcphub search github --json
mcphub list --json
mcphub info @official/github --json
```

<br />

## 🏗️ How It Works

1. **Registry** — MCP Hub maintains a registry of MCP servers (built-in + GitHub discovery)
2. **Install** — Downloads config and sets up environment variables
3. **Configure** — Automatically updates your `claude_desktop_config.json`
4. **Run** — Claude Desktop loads the MCP server on startup

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   MCP Hub    │────▶│   Registry   │────▶│ Claude Config │
│    CLI       │     │   (GitHub)   │     │    .json      │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │    Claude    │
                                          │   Desktop    │
                                          └──────────────┘
```

<br />

## 🔧 Configuration

MCP Hub stores its config in `~/.mcphub/config.json`:

```json
{
  "servers": {
    "@official/github": {
      "name": "@official/github",
      "version": "1.0.0",
      "installedAt": "2024-12-20T10:00:00.000Z",
      "config": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": { "GITHUB_TOKEN": "ghp_xxx" }
      },
      "enabled": true
    }
  },
  "settings": {
    "registryUrl": "https://registry.mcphub.dev",
    "autoUpdate": true
  }
}
```

### Environment Variables

Some servers require environment variables. MCP Hub will prompt you during installation:

```bash
$ mcphub install @official/github

  This server requires the following environment variables:

  GITHUB_TOKEN: ghp_xxxxxxxxxxxxx

Install @official/github? (Y/n) 
```

<br />

## 🛠️ Programmatic API

Use MCP Hub as a library in your Node.js projects:

```typescript
import { Registry, Config, getRegistry, getConfig } from 'mcphub';

// Search for servers
const registry = getRegistry();
const servers = await registry.search({ 
  query: 'github',
  category: 'devtools',
  limit: 10 
});

// Install a server
const config = getConfig();
config.installServer({
  name: '@official/github',
  version: '1.0.0',
  installedAt: new Date().toISOString(),
  config: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: { GITHUB_TOKEN: process.env.GITHUB_TOKEN }
  },
  enabled: true
});

// Update Claude Desktop config
Config.updateClaudeConfig(config.getInstalledServers());
```

<br />

## 🗂️ Categories

| Category | Emoji | Description |
|----------|-------|-------------|
| `devtools` | 🛠️ | Developer tools and utilities |
| `productivity` | 📊 | Boost your workflow |
| `data` | 📁 | Data processing and analysis |
| `ai` | 🤖 | AI and machine learning |
| `communication` | 💬 | Chat, email, messaging |
| `automation` | ⚡ | Automate workflows |
| `security` | 🔒 | Security and authentication |
| `cloud` | ☁️ | Cloud services |
| `database` | 🗄️ | Database tools |

<br />

## 🆚 Comparison

| Feature | MCP Hub | Manual Setup | Other Tools |
|---------|---------|--------------|-------------|
| Search servers | ✅ One command | ❌ Google | ❌ N/A |
| Install | ✅ Automatic | ❌ Manual config | ⚠️ Partial |
| Claude integration | ✅ Auto-update | ❌ Edit JSON | ❌ Manual |
| Categories | ✅ Built-in | ❌ None | ❌ None |
| Verified publishers | ✅ Yes | ❌ No | ❌ No |
| Enable/disable | ✅ Toggle | ❌ Delete/re-add | ❌ N/A |
| Doctor diagnostics | ✅ Yes | ❌ No | ❌ No |

<br />

## 💰 Pricing

| Feature | Free | Pro ($19/mo) | Enterprise |
|---------|------|--------------|------------|
| Search & Install | ✅ Unlimited | ✅ Unlimited | ✅ Unlimited |
| Public servers | ✅ All | ✅ All | ✅ All |
| Private servers | ❌ | ✅ Up to 10 | ✅ Unlimited |
| Download analytics | ❌ | ✅ | ✅ |
| Verified badge | ❌ | ✅ | ✅ |
| Priority support | ❌ | ✅ Email | ✅ Dedicated |
| SSO/SAML | ❌ | ❌ | ✅ |
| Self-hosted registry | ❌ | ❌ | ✅ |
| SLA | ❌ | ❌ | ✅ 99.9% |

[Contact us for Enterprise →](mailto:enterprise@mcphub.dev)

<br />

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Clone the repo
git clone https://github.com/DebuggingMax/mcphub.git
cd mcphub

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Link for local development
npm link
```

<br />

## 📣 Community

- 💬 [Discord](https://discord.gg/mcphub) — Chat with us
- 🐦 [Twitter](https://twitter.com/mcphub_dev) — Updates and announcements
- 📝 [Blog](https://mcphub.dev/blog) — Tutorials and news
- 🐛 [Issues](https://github.com/DebuggingMax/mcphub/issues) — Report bugs

<br />

## 🗺️ Roadmap

- [x] CLI with search, install, list
- [x] Claude Desktop integration
- [x] Categories and filters
- [ ] Web UI (browse.mcphub.dev)
- [ ] `mcphub publish` command
- [ ] Ratings and reviews
- [ ] Security scanning
- [ ] Self-hosted registry (Enterprise)

<br />

## 📜 License

MIT © [DebuggingMax](https://github.com/DebuggingMax)

---

<div align="center">
  <br />
  <strong>Built with ❤️ for the AI community</strong>
  <br />
  <br />
  <a href="https://github.com/DebuggingMax/mcphub">⭐ Star us on GitHub</a>
  <br />
  <br />
  <sub>MCP Hub is not affiliated with Anthropic. MCP is a trademark of Anthropic, PBC.</sub>
</div>
