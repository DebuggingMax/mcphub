import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import type { InstalledServer, UserConfig } from '../types/index.js';
import { UserConfigSchema } from '../types/index.js';

const CONFIG_DIR = join(homedir(), '.mcphub');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');
const CLAUDE_CONFIG_PATHS = [
  // Claude Desktop paths
  join(homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json'), // macOS
  join(homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json'), // Windows
  join(homedir(), '.config', 'claude', 'claude_desktop_config.json'), // Linux
];

export class Config {
  private config: UserConfig;
  private configPath: string;

  constructor(configPath?: string) {
    this.configPath = configPath || CONFIG_FILE;
    this.config = this.load();
  }

  private load(): UserConfig {
    try {
      if (existsSync(this.configPath)) {
        const raw = readFileSync(this.configPath, 'utf-8');
        const parsed = JSON.parse(raw);
        return UserConfigSchema.parse(parsed);
      }
    } catch (error) {
      // Invalid config, start fresh
    }
    return UserConfigSchema.parse({});
  }

  save(): void {
    const dir = dirname(this.configPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  // Server management
  getInstalledServers(): Record<string, InstalledServer> {
    return this.config.servers;
  }

  getInstalledServer(name: string): InstalledServer | undefined {
    return this.config.servers[name];
  }

  installServer(server: InstalledServer): void {
    this.config.servers[server.name] = server;
    this.save();
  }

  uninstallServer(name: string): boolean {
    if (this.config.servers[name]) {
      delete this.config.servers[name];
      this.save();
      return true;
    }
    return false;
  }

  toggleServer(name: string, enabled: boolean): boolean {
    const server = this.config.servers[name];
    if (server) {
      server.enabled = enabled;
      this.save();
      return true;
    }
    return false;
  }

  // Settings
  getSetting<K extends keyof UserConfig['settings']>(key: K): UserConfig['settings'][K] {
    return this.config.settings[key];
  }

  setSetting<K extends keyof UserConfig['settings']>(key: K, value: UserConfig['settings'][K]): void {
    this.config.settings[key] = value;
    this.save();
  }

  // Claude Desktop integration
  static findClaudeConfig(): string | null {
    for (const path of CLAUDE_CONFIG_PATHS) {
      if (existsSync(path)) {
        return path;
      }
    }
    return null;
  }

  static getClaudeConfig(): ClaudeDesktopConfig | null {
    const configPath = Config.findClaudeConfig();
    if (!configPath) return null;

    try {
      const raw = readFileSync(configPath, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static updateClaudeConfig(servers: Record<string, InstalledServer>): boolean {
    const configPath = Config.findClaudeConfig();
    if (!configPath) return false;

    try {
      let config: ClaudeDesktopConfig;
      if (existsSync(configPath)) {
        config = JSON.parse(readFileSync(configPath, 'utf-8'));
      } else {
        config = { mcpServers: {} };
      }

      // Add/update MCP servers
      for (const [name, server] of Object.entries(servers)) {
        if (server.enabled) {
          config.mcpServers[name] = {
            command: server.config.command,
            args: server.config.args,
            env: server.config.env,
          };
        } else {
          delete config.mcpServers[name];
        }
      }

      // Write config
      const dir = dirname(configPath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(configPath, JSON.stringify(config, null, 2));
      return true;
    } catch {
      return false;
    }
  }
}

interface ClaudeDesktopConfig {
  mcpServers: Record<string, {
    command: string;
    args?: string[];
    env?: Record<string, string>;
  }>;
}

// Singleton instance
let configInstance: Config | null = null;

export function getConfig(configPath?: string): Config {
  if (!configInstance || configPath) {
    configInstance = new Config(configPath);
  }
  return configInstance;
}
