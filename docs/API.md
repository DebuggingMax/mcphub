# API Reference

## CLI Commands

### mcphub search [query]
Search for MCP servers.

**Options:**
- `-c, --category <cat>` - Filter by category
- `-v, --verified` - Show only verified servers
- `-l, --limit <n>` - Max results (default: 20)
- `-s, --sort <field>` - Sort by: downloads, stars, name, updated
- `--json` - Output as JSON

**Example:**
```bash
mcphub search github --category devtools --limit 5
```

### mcphub install <name>
Install an MCP server.

**Options:**
- `-v, --version <ver>` - Specific version
- `-y, --yes` - Skip prompts
- `--json` - Output as JSON

### mcphub list
List installed servers.

**Options:**
- `--enabled` - Only enabled
- `--disabled` - Only disabled
- `--json` - Output as JSON

### mcphub info <name>
Show server details.

### mcphub enable/disable <name>
Toggle server status.

### mcphub uninstall <name>
Remove a server.

### mcphub doctor
Diagnose MCP setup issues.

### mcphub categories
List all categories.

### mcphub stats
Show registry statistics.

## Programmatic Usage

```javascript
import { getRegistry, getConfig } from '@debuggingmax/mcphub';

// Search
const registry = getRegistry();
const servers = await registry.search({ query: 'github' });

// Config
const config = getConfig();
const installed = config.getInstalledServers();
```
