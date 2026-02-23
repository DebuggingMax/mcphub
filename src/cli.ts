#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import {
  searchCommand,
  categoriesCommand,
  installCommand,
  uninstallCommand,
  listCommand,
  enableCommand,
  disableCommand,
  infoCommand,
  statsCommand,
} from './commands/index.js';

// Get package version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let version = '1.0.0';
try {
  const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
  version = pkg.version;
} catch {
  // Use default version
}

const program = new Command();

// ASCII Art Banner
const banner = `
${chalk.cyan('╔═══════════════════════════════════════════════════════════╗')}
${chalk.cyan('║')}  ${chalk.bold.white('🔌 MCP Hub')} ${chalk.gray('- The MCP Server Marketplace')}             ${chalk.cyan('║')}
${chalk.cyan('║')}  ${chalk.gray('Find, install, and manage MCP servers with ease')}        ${chalk.cyan('║')}
${chalk.cyan('╚═══════════════════════════════════════════════════════════╝')}
`;

program
  .name('mcphub')
  .description('The MCP Server Marketplace - Find, install, and publish MCP servers')
  .version(version)
  .addHelpText('beforeAll', banner);

// Search command
program
  .command('search [query]')
  .description('Search for MCP servers')
  .option('-c, --category <category>', 'Filter by category')
  .option('-v, --verified', 'Show only verified servers')
  .option('-l, --limit <number>', 'Maximum results to show', '20')
  .option('-s, --sort <field>', 'Sort by: downloads, stars, name, updated', 'downloads')
  .option('--json', 'Output as JSON')
  .action(async (query: string | undefined, options) => {
    try {
      await searchCommand(query, {
        category: options.category,
        verified: options.verified,
        limit: parseInt(options.limit),
        sort: options.sort as 'downloads' | 'stars' | 'name' | 'updated',
        json: options.json,
      });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Categories command
program
  .command('categories')
  .alias('cats')
  .description('List all categories')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    try {
      await categoriesCommand({ json: options.json });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Install command
program
  .command('install <name>')
  .alias('i')
  .description('Install an MCP server')
  .option('-v, --version <version>', 'Install specific version')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--json', 'Output as JSON')
  .action(async (name: string, options) => {
    try {
      await installCommand(name, {
        version: options.version,
        yes: options.yes,
        json: options.json,
      });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Uninstall command
program
  .command('uninstall <name>')
  .alias('rm')
  .description('Uninstall an MCP server')
  .option('-y, --yes', 'Skip confirmation')
  .option('--json', 'Output as JSON')
  .action(async (name: string, options) => {
    try {
      await uninstallCommand(name, {
        yes: options.yes,
        json: options.json,
      });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// List command
program
  .command('list')
  .alias('ls')
  .description('List installed MCP servers')
  .option('--enabled', 'Show only enabled servers')
  .option('--disabled', 'Show only disabled servers')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    try {
      let enabled: boolean | undefined;
      if (options.enabled) enabled = true;
      if (options.disabled) enabled = false;
      
      await listCommand({
        json: options.json,
        enabled,
      });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Enable command
program
  .command('enable <name>')
  .description('Enable an installed MCP server')
  .option('--json', 'Output as JSON')
  .action(async (name: string, options) => {
    try {
      await enableCommand(name, { json: options.json });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Disable command
program
  .command('disable <name>')
  .description('Disable an installed MCP server')
  .option('--json', 'Output as JSON')
  .action(async (name: string, options) => {
    try {
      await disableCommand(name, { json: options.json });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Info command
program
  .command('info <name>')
  .alias('show')
  .description('Show detailed information about an MCP server')
  .option('--json', 'Output as JSON')
  .action(async (name: string, options) => {
    try {
      await infoCommand(name, { json: options.json });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Stats command
program
  .command('stats')
  .description('Show MCP Hub statistics')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    try {
      await statsCommand({ json: options.json });
    } catch (err) {
      console.error(chalk.red('Error:'), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  });

// Update command (placeholder)
program
  .command('update [name]')
  .description('Update installed MCP server(s)')
  .option('-a, --all', 'Update all servers')
  .action(async (name: string | undefined, options) => {
    console.log(chalk.yellow('⚠'), 'Update functionality coming soon!');
    console.log(chalk.gray('  For now, use `mcphub uninstall <name>` and `mcphub install <name>`'));
  });

// Doctor command
program
  .command('doctor')
  .description('Check your MCP setup for issues')
  .action(async () => {
    console.log(chalk.cyan('🔍'), 'Checking your MCP setup...\n');
    
    const { Config, getConfig } = await import('./lib/config.js');
    
    // Check Claude Desktop config
    const claudePath = Config.findClaudeConfig();
    if (claudePath) {
      console.log(chalk.green('✓'), 'Claude Desktop config found');
      console.log(chalk.gray(`  ${claudePath}`));
    } else {
      console.log(chalk.yellow('⚠'), 'Claude Desktop config not found');
      console.log(chalk.gray('  Install Claude Desktop or create config manually'));
    }
    
    // Check installed servers
    const config = getConfig();
    const servers = config.getInstalledServers();
    const count = Object.keys(servers).length;
    
    if (count > 0) {
      const enabled = Object.values(servers).filter(s => s.enabled).length;
      console.log(chalk.green('✓'), `${count} MCP server(s) installed, ${enabled} enabled`);
    } else {
      console.log(chalk.yellow('⚠'), 'No MCP servers installed');
      console.log(chalk.gray('  Run `mcphub search` to find servers'));
    }
    
    console.log('');
    console.log(chalk.cyan('💡'), 'Tips:');
    console.log(chalk.gray('  • Run `mcphub search` to discover servers'));
    console.log(chalk.gray('  • Run `mcphub list` to see installed servers'));
    console.log(chalk.gray('  • Restart Claude Desktop after changes'));
  });

// Parse and run
program.parse();
