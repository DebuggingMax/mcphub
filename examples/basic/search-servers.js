#!/usr/bin/env node
// Search for MCP servers programmatically

import { execSync } from 'child_process';

const query = process.argv[2] || 'github';
const result = execSync(`mcphub search ${query} --json`, { encoding: 'utf-8' });
const servers = JSON.parse(result);

console.log(`Found ${servers.length} servers:`);
servers.forEach(s => {
  console.log(`  - ${s.name}: ${s.description}`);
});
