import ora from 'ora';
import chalk from 'chalk';
import { getRegistry } from '../lib/registry.js';
import { getConfig } from '../lib/config.js';
import { error, info, formatStats } from '../utils/output.js';
import { CATEGORIES, type Category } from '../types/index.js';

export interface InfoCommandOptions {
  json?: boolean;
}

export async function infoCommand(
  name: string,
  options: InfoCommandOptions
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

    if (options.json) {
      console.log(JSON.stringify(server, null, 2));
      return;
    }

    // Check if installed
    const config = getConfig();
    const installed = config.getInstalledServer(name);

    // Display detailed info
    const verified = server.verified ? chalk.green(' ✓ Verified') : '';
    console.log(`
  ${chalk.bold.cyan(server.name)} ${chalk.gray('v' + server.version)}${verified}
  
  ${chalk.white(server.description)}

  ${chalk.bold('Details')}
  ${'─'.repeat(50)}
  ${chalk.gray('Author:')}       ${server.author}
  ${chalk.gray('License:')}      ${server.license}
  ${chalk.gray('Categories:')}   ${server.categories.map(c => getCategoryDisplay(c as Category)).join(', ')}
  ${chalk.gray('Keywords:')}     ${server.keywords.join(', ') || 'none'}
  ${chalk.gray('Downloads:')}    ${formatNumber(server.downloads)}
  ${chalk.gray('Stars:')}        ${formatNumber(server.stars)}
  ${chalk.gray('Repository:')}  ${chalk.blue.underline(server.repository)}
  ${server.homepage ? `${chalk.gray('Homepage:')}    ${chalk.blue.underline(server.homepage)}` : ''}

  ${chalk.bold('Installation Status')}
  ${'─'.repeat(50)}
  ${installed 
    ? `${chalk.green('● Installed')} (v${installed.version}, ${installed.enabled ? 'enabled' : 'disabled'})`
    : chalk.gray('○ Not installed')
  }
`);

    // Tools
    if (server.tools && server.tools.length > 0) {
      console.log(`  ${chalk.bold('Tools')}`);
      console.log(`  ${'─'.repeat(50)}`);
      for (const tool of server.tools) {
        console.log(`  ${chalk.cyan('•')} ${chalk.white(tool.name)}`);
        console.log(`    ${chalk.gray(tool.description)}`);
      }
      console.log('');
    }

    // Resources
    if (server.resources && server.resources.length > 0) {
      console.log(`  ${chalk.bold('Resources')}`);
      console.log(`  ${'─'.repeat(50)}`);
      for (const resource of server.resources) {
        console.log(`  ${chalk.yellow('•')} ${chalk.white(resource.name)}`);
        console.log(`    ${chalk.gray(resource.description)}`);
      }
      console.log('');
    }

    // Config example
    console.log(`  ${chalk.bold('Configuration')}`);
    console.log(`  ${'─'.repeat(50)}`);
    console.log(chalk.gray(`
  // Add to claude_desktop_config.json:
  "${server.name}": {
    "command": "${server.config.command}",
    "args": ${JSON.stringify(server.config.args || [])}${
      server.config.env 
        ? `,\n    "env": ${JSON.stringify(server.config.env, null, 6).replace(/\n/g, '\n    ')}`
        : ''
    }
  }
`));

    if (!installed) {
      console.log(`  Run ${chalk.cyan(`mcphub install ${name}`)} to install\n`);
    }
  } catch (err) {
    spinner.fail('Failed to fetch server info');
    throw err;
  }
}

export async function statsCommand(options: InfoCommandOptions): Promise<void> {
  const spinner = ora('Fetching statistics...').start();

  try {
    const registry = getRegistry();
    const stats = await registry.getStats();
    
    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(stats, null, 2));
      return;
    }

    console.log(formatStats(stats));
    console.log(`  ${chalk.gray('Registry:')} https://registry.mcphub.dev`);
    console.log(`  ${chalk.gray('GitHub:')}   https://github.com/DebuggingMax/mcphub\n`);
  } catch (err) {
    spinner.fail('Failed to fetch statistics');
    throw err;
  }
}

function getCategoryDisplay(category: Category): string {
  const cat = CATEGORIES[category];
  return cat ? `${cat.emoji} ${cat.name}` : category;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
