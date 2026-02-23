import type { RegistryEntry, InstalledServer } from '../types/index.js';
export declare function formatServerTable(servers: RegistryEntry[]): string;
export declare function formatInstalledTable(servers: Record<string, InstalledServer>): string;
export declare function formatServerDetails(server: RegistryEntry): string;
export declare function formatCategoryList(): string;
export declare function formatStats(stats: {
    totalServers: number;
    totalDownloads: number;
    categories: number;
}): string;
export declare function success(message: string): void;
export declare function error(message: string): void;
export declare function warn(message: string): void;
export declare function info(message: string): void;
//# sourceMappingURL=output.d.ts.map