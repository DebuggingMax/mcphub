/**
 * MCP Hub - The MCP Server Marketplace
 * 
 * A CLI and library for discovering, installing, and managing MCP (Model Context Protocol) servers.
 * 
 * @example
 * ```typescript
 * import { Registry, Config } from 'mcphub';
 * 
 * // Search for servers
 * const registry = new Registry();
 * const servers = await registry.search({ query: 'github' });
 * 
 * // Install a server
 * const config = new Config();
 * config.installServer({
 *   name: '@official/github',
 *   version: '1.0.0',
 *   installedAt: new Date().toISOString(),
 *   config: { command: 'npx', args: ['-y', '@modelcontextprotocol/server-github'] },
 *   enabled: true,
 * });
 * ```
 * 
 * @packageDocumentation
 */

// Core library exports
export { Registry, getRegistry } from './lib/registry.js';
export { Config, getConfig } from './lib/config.js';

// Types
export type {
  MCPServer,
  RegistryEntry,
  InstalledServer,
  UserConfig,
  SearchOptions,
  InstallOptions,
  CLIContext,
  Category,
} from './types/index.js';

export { MCPServerSchema, RegistryEntrySchema, InstalledServerSchema, UserConfigSchema, CATEGORIES } from './types/index.js';

// Utilities
export * as output from './utils/output.js';

// Version
export const VERSION = '1.0.0';
