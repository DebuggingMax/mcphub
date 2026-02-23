import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
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
    config;
    configPath;
    constructor(configPath) {
        this.configPath = configPath || CONFIG_FILE;
        this.config = this.load();
    }
    load() {
        try {
            if (existsSync(this.configPath)) {
                const raw = readFileSync(this.configPath, 'utf-8');
                const parsed = JSON.parse(raw);
                return UserConfigSchema.parse(parsed);
            }
        }
        catch (error) {
            // Invalid config, start fresh
        }
        return UserConfigSchema.parse({});
    }
    save() {
        const dir = dirname(this.configPath);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    }
    // Server management
    getInstalledServers() {
        return this.config.servers;
    }
    getInstalledServer(name) {
        return this.config.servers[name];
    }
    installServer(server) {
        this.config.servers[server.name] = server;
        this.save();
    }
    uninstallServer(name) {
        if (this.config.servers[name]) {
            delete this.config.servers[name];
            this.save();
            return true;
        }
        return false;
    }
    toggleServer(name, enabled) {
        const server = this.config.servers[name];
        if (server) {
            server.enabled = enabled;
            this.save();
            return true;
        }
        return false;
    }
    // Settings
    getSetting(key) {
        return this.config.settings[key];
    }
    setSetting(key, value) {
        this.config.settings[key] = value;
        this.save();
    }
    // Claude Desktop integration
    static findClaudeConfig() {
        for (const path of CLAUDE_CONFIG_PATHS) {
            if (existsSync(path)) {
                return path;
            }
        }
        return null;
    }
    static getClaudeConfig() {
        const configPath = Config.findClaudeConfig();
        if (!configPath)
            return null;
        try {
            const raw = readFileSync(configPath, 'utf-8');
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    static updateClaudeConfig(servers) {
        const configPath = Config.findClaudeConfig();
        if (!configPath)
            return false;
        try {
            let config;
            if (existsSync(configPath)) {
                config = JSON.parse(readFileSync(configPath, 'utf-8'));
            }
            else {
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
                }
                else {
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
        }
        catch {
            return false;
        }
    }
}
// Singleton instance
let configInstance = null;
export function getConfig(configPath) {
    if (!configInstance || configPath) {
        configInstance = new Config(configPath);
    }
    return configInstance;
}
//# sourceMappingURL=config.js.map