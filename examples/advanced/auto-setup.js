#!/usr/bin/env node
// Automatically install recommended MCP servers for development

import { execSync } from 'child_process';

const devServers = [
  '@official/github',
  '@official/filesystem', 
  '@official/puppeteer',
];

console.log('🚀 Setting up MCP development environment...\n');

for (const server of devServers) {
  console.log(`Installing ${server}...`);
  try {
    execSync(`mcphub install ${server} --yes`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to install ${server}`);
  }
}

console.log('\n✅ Setup complete! Restart Claude Desktop to use.');
