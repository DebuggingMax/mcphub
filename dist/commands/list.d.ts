export interface ListCommandOptions {
    json?: boolean;
    enabled?: boolean;
}
export declare function listCommand(options: ListCommandOptions): Promise<void>;
export declare function enableCommand(name: string, options: {
    json?: boolean;
}): Promise<void>;
export declare function disableCommand(name: string, options: {
    json?: boolean;
}): Promise<void>;
//# sourceMappingURL=list.d.ts.map