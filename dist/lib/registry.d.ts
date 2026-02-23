import type { MCPServer, RegistryEntry, SearchOptions } from '../types/index.js';
export declare class Registry {
    private servers;
    private registryUrl;
    private cacheTimeout;
    private lastFetch;
    constructor(registryUrl?: string, cacheTimeout?: number);
    search(options?: SearchOptions): Promise<RegistryEntry[]>;
    get(name: string): Promise<MCPServer | null>;
    getCategories(): Promise<string[]>;
    getStats(): Promise<{
        totalServers: number;
        totalDownloads: number;
        categories: number;
    }>;
    refresh(): Promise<void>;
}
export declare function getRegistry(url?: string, cacheTimeout?: number): Registry;
//# sourceMappingURL=registry.d.ts.map