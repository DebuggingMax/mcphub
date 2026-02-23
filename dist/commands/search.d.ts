export interface SearchCommandOptions {
    category?: string;
    verified?: boolean;
    limit?: number;
    sort?: 'downloads' | 'stars' | 'name' | 'updated';
    json?: boolean;
}
export declare function searchCommand(query: string | undefined, options: SearchCommandOptions): Promise<void>;
export declare function categoriesCommand(options: {
    json?: boolean;
}): Promise<void>;
//# sourceMappingURL=search.d.ts.map