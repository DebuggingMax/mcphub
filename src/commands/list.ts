import { getConfig } from '../lib/config.js';
import { formatInstalledTable, info } from '../utils/output.js';

export interface ListCommandOptions {
  json?: boolean;
  enabled?: boolean;
}

export async function listCommand(options: ListCommandOptions): Promise<void> {
  const config = getConfig();
  let servers = config.getInstalledServers();

  // Filter by enabled status
  if (options.enabled !== undefined) {
    servers = Object.fromEntries(
      Object.entries(servers).filter(([_, s]) => s.enabled === options.enabled)
    );
  }

  if (options.json) {
    console.log(JSON.stringify(servers, null, 2));
    return;
  }

  const count = Object.keys(servers).length;
  if (count === 0) {
    console.log(formatInstalledTable(servers));
    return;
  }

  const enabledCount = Object.values(servers).filter(s => s.enabled).length;
  info(`${count} server(s) installed, ${enabledCount} enabled`);
  console.log(formatInstalledTable(servers));
  
  console.log(`  Run ${'\x1b[36m'}mcphub enable <name>${'\x1b[0m'} to enable a server`);
  console.log(`  Run ${'\x1b[36m'}mcphub disable <name>${'\x1b[0m'} to disable\n`);
}

export async function enableCommand(name: string, options: { json?: boolean }): Promise<void> {
  const config = getConfig();
  const server = config.getInstalledServer(name);

  if (!server) {
    console.error(`Server "${name}" is not installed`);
    return;
  }

  if (server.enabled) {
    info(`${name} is already enabled`);
    return;
  }

  config.toggleServer(name, true);
  
  const { Config } = await import('../lib/config.js');
  Config.updateClaudeConfig(config.getInstalledServers());
  
  console.log(`✓ Enabled ${name}`);
  info('Restart Claude Desktop to apply changes');

  if (options.json) {
    console.log(JSON.stringify({ name, enabled: true }, null, 2));
  }
}

export async function disableCommand(name: string, options: { json?: boolean }): Promise<void> {
  const config = getConfig();
  const server = config.getInstalledServer(name);

  if (!server) {
    console.error(`Server "${name}" is not installed`);
    return;
  }

  if (!server.enabled) {
    info(`${name} is already disabled`);
    return;
  }

  config.toggleServer(name, false);
  
  const { Config } = await import('../lib/config.js');
  Config.updateClaudeConfig(config.getInstalledServers());
  
  console.log(`✓ Disabled ${name}`);
  info('Restart Claude Desktop to apply changes');

  if (options.json) {
    console.log(JSON.stringify({ name, enabled: false }, null, 2));
  }
}
