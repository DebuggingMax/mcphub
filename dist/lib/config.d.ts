import type { InstalledServer, UserConfig } from '../types/index.js';
export declare class Config {
    private config;
    private configPath;
    constructor(configPath?: string);
    private load;
    save(): void;
    getInstalledServers(): Record<string, InstalledServer>;
    getInstalledServer(name: string): InstalledServer | undefined;
    installServer(server: InstalledServer): void;
    uninstallServer(name: string): boolean;
    toggleServer(name: string, enabled: boolean): boolean;
    getSetting<K extends keyof UserConfig['settings']>(key: K): UserConfig['settings'][K];
    setSetting<K extends keyof UserConfig['settings']>(key: K, value: UserConfig['settings'][K]): void;
    static findClaudeConfig(): string | null;
    static getClaudeConfig(): ClaudeDesktopConfig | null;
    static updateClaudeConfig(servers: Record<string, InstalledServer>): boolean;
}
interface ClaudeDesktopConfig {
    mcpServers: Record<string, {
        command: string;
        args?: string[];
        env?: Record<string, string>;
    }>;
}
export declare function getConfig(configPath?: string): Config;
export {};
//# sourceMappingURL=config.d.ts.map