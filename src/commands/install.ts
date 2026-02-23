import ora from 'ora';
import inquirer from 'inquirer';
import { getRegistry } from '../lib/registry.js';
import { getConfig, Config } from '../lib/config.js';
import { success, error, warn, info, formatServerDetails } from '../utils/output.js';
import type { InstalledServer } from '../types/index.js';

export interface InstallCommandOptions {
  version?: string;
  yes?: boolean;
  json?: boolean;
}

export async function installCommand(
  name: string,
  options: InstallCommandOptions
): Promise<void> {
  const spinner = ora(`Fetching ${name}...`).start();

  try {
    const registry = getRegistry();
    const server = await registry.get(name);

    if (!server) {
      spinner.fail(`Server "${name}" not found`);
      info('Run `mcphub search` to find available servers');
      return;
    }

    spinner.stop();
    console.log(formatServerDetails({
      name: server.name,
      version: server.version,
      description: server.description,
      author: server.author,
      categories: server.categories,
      downloads: server.downloads,
      stars: server.stars,
      verified: server.verified,
      repository: server.repository,
    }));

    // Check if already installed
    const config = getConfig();
    const existing = config.getInstalledServer(name);
    if (existing) {
      warn(`${name} is already installed (v${existing.version})`);
      
      if (!options.yes) {
        const { reinstall } = await inquirer.prompt([{
          type: 'confirm',
          name: 'reinstall',
          message: 'Do you want to reinstall?',
          default: false,
        }]);
        
        if (!reinstall) {
          return;
        }
      }
    }

    // Check for required environment variables
    const requiredEnv = server.config.env || {};
    const missingEnv: string[] = [];
    const envValues: Record<string, string> = {};

    for (const [key, defaultValue] of Object.entries(requiredEnv)) {
      if (!defaultValue && !process.env[key]) {
        missingEnv.push(key);
      } else {
        envValues[key] = process.env[key] || defaultValue;
      }
    }

    if (missingEnv.length > 0 && !options.yes) {
      console.log('\n  This server requires the following environment variables:\n');
      
      for (const key of missingEnv) {
        const { value } = await inquirer.prompt([{
          type: 'input',
          name: 'value',
          message: `  ${key}:`,
        }]);
        envValues[key] = value;
      }
    }

    // Confirm installation
    if (!options.yes) {
      const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: `Install ${name}?`,
        default: true,
      }]);

      if (!confirm) {
        info('Installation cancelled');
        return;
      }
    }

    // Install
    const installSpinner = ora('Installing...').start();

    const installedServer: InstalledServer = {
      name: server.name,
      version: server.version,
      installedAt: new Date().toISOString(),
      config: {
        command: server.config.command,
        args: server.config.args,
        env: Object.keys(envValues).length > 0 ? envValues : undefined,
      },
      enabled: true,
    };

    config.installServer(installedServer);

    // Update Claude Desktop config
    const claudeUpdated = Config.updateClaudeConfig(config.getInstalledServers());
    installSpinner.stop();

    success(`Installed ${name} v${server.version}`);
    
    if (claudeUpdated) {
      success('Updated Claude Desktop configuration');
      info('Restart Claude Desktop to use the new server');
    } else {
      warn('Claude Desktop config not found');
      info('You may need to manually add the server to your MCP config');
      console.log('\n  Add this to your claude_desktop_config.json:');
      console.log(`
  "${server.name}": {
    "command": "${server.config.command}",
    "args": ${JSON.stringify(server.config.args || [])}${
      Object.keys(envValues).length > 0 
        ? `,\n    "env": ${JSON.stringify(envValues, null, 6).replace(/\n/g, '\n    ')}` 
        : ''
    }
  }
`);
    }

    if (options.json) {
      console.log(JSON.stringify(installedServer, null, 2));
    }
  } catch (err) {
    spinner.fail('Installation failed');
    throw err;
  }
}

export async function uninstallCommand(
  name: string,
  options: { yes?: boolean; json?: boolean }
): Promise<void> {
  const config = getConfig();
  const server = config.getInstalledServer(name);

  if (!server) {
    error(`Server "${name}" is not installed`);
    return;
  }

  if (!options.yes) {
    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: `Uninstall ${name}?`,
      default: false,
    }]);

    if (!confirm) {
      info('Uninstall cancelled');
      return;
    }
  }

  config.uninstallServer(name);
  
  // Update Claude Desktop config
  const claudeUpdated = Config.updateClaudeConfig(config.getInstalledServers());

  success(`Uninstalled ${name}`);
  
  if (claudeUpdated) {
    success('Updated Claude Desktop configuration');
    info('Restart Claude Desktop to apply changes');
  }

  if (options.json) {
    console.log(JSON.stringify({ name, uninstalled: true }, null, 2));
  }
}
