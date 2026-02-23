export interface InstallCommandOptions {
    version?: string;
    yes?: boolean;
    json?: boolean;
}
export declare function installCommand(name: string, options: InstallCommandOptions): Promise<void>;
export declare function uninstallCommand(name: string, options: {
    yes?: boolean;
    json?: boolean;
}): Promise<void>;
//# sourceMappingURL=install.d.ts.map