import { z } from 'zod';
export declare const MCPServerSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    description: z.ZodString;
    author: z.ZodString;
    repository: z.ZodString;
    homepage: z.ZodOptional<z.ZodString>;
    license: z.ZodDefault<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    categories: z.ZodDefault<z.ZodArray<z.ZodEnum<["devtools", "productivity", "data", "ai", "communication", "automation", "security", "cloud", "database", "other"]>, "many">>;
    tools: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
    }, {
        name: string;
        description: string;
    }>, "many">>;
    resources: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
    }, {
        name: string;
        description: string;
    }>, "many">>;
    prompts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
    }, {
        name: string;
        description: string;
    }>, "many">>;
    config: z.ZodObject<{
        command: z.ZodString;
        args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    }, {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    }>;
    verified: z.ZodDefault<z.ZodBoolean>;
    downloads: z.ZodDefault<z.ZodNumber>;
    stars: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    version: string;
    description: string;
    author: string;
    repository: string;
    license: string;
    keywords: string[];
    categories: ("devtools" | "productivity" | "data" | "ai" | "communication" | "automation" | "security" | "cloud" | "database" | "other")[];
    config: {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    };
    verified: boolean;
    downloads: number;
    stars: number;
    homepage?: string | undefined;
    tools?: {
        name: string;
        description: string;
    }[] | undefined;
    resources?: {
        name: string;
        description: string;
    }[] | undefined;
    prompts?: {
        name: string;
        description: string;
    }[] | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}, {
    name: string;
    version: string;
    description: string;
    author: string;
    repository: string;
    config: {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    };
    homepage?: string | undefined;
    license?: string | undefined;
    keywords?: string[] | undefined;
    categories?: ("devtools" | "productivity" | "data" | "ai" | "communication" | "automation" | "security" | "cloud" | "database" | "other")[] | undefined;
    tools?: {
        name: string;
        description: string;
    }[] | undefined;
    resources?: {
        name: string;
        description: string;
    }[] | undefined;
    prompts?: {
        name: string;
        description: string;
    }[] | undefined;
    verified?: boolean | undefined;
    downloads?: number | undefined;
    stars?: number | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}>;
export type MCPServer = z.infer<typeof MCPServerSchema>;
export declare const RegistryEntrySchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    description: z.ZodString;
    author: z.ZodString;
    categories: z.ZodArray<z.ZodString, "many">;
    downloads: z.ZodNumber;
    stars: z.ZodNumber;
    verified: z.ZodBoolean;
    repository: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    version: string;
    description: string;
    author: string;
    repository: string;
    categories: string[];
    verified: boolean;
    downloads: number;
    stars: number;
}, {
    name: string;
    version: string;
    description: string;
    author: string;
    repository: string;
    categories: string[];
    verified: boolean;
    downloads: number;
    stars: number;
}>;
export type RegistryEntry = z.infer<typeof RegistryEntrySchema>;
export declare const InstalledServerSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    installedAt: z.ZodString;
    config: z.ZodObject<{
        command: z.ZodString;
        args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    }, {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    }>;
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    version: string;
    config: {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    };
    installedAt: string;
    enabled: boolean;
}, {
    name: string;
    version: string;
    config: {
        command: string;
        args?: string[] | undefined;
        env?: Record<string, string> | undefined;
    };
    installedAt: string;
    enabled?: boolean | undefined;
}>;
export type InstalledServer = z.infer<typeof InstalledServerSchema>;
export declare const UserConfigSchema: z.ZodObject<{
    servers: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        name: z.ZodString;
        version: z.ZodString;
        installedAt: z.ZodString;
        config: z.ZodObject<{
            command: z.ZodString;
            args: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            command: string;
            args?: string[] | undefined;
            env?: Record<string, string> | undefined;
        }, {
            command: string;
            args?: string[] | undefined;
            env?: Record<string, string> | undefined;
        }>;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        version: string;
        config: {
            command: string;
            args?: string[] | undefined;
            env?: Record<string, string> | undefined;
        };
        installedAt: string;
        enabled: boolean;
    }, {
        name: string;
        version: string;
        config: {
            command: string;
            args?: string[] | undefined;
            env?: Record<string, string> | undefined;
        };
        installedAt: string;
        enabled?: boolean | undefined;
    }>>>;
    settings: z.ZodDefault<z.ZodObject<{
        registryUrl: z.ZodDefault<z.ZodString>;
        cacheTimeout: z.ZodDefault<z.ZodNumber>;
        autoUpdate: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        registryUrl: string;
        cacheTimeout: number;
        autoUpdate: boolean;
    }, {
        registryUrl?: string | undefined;
        cacheTimeout?: number | undefined;
        autoUpdate?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    servers: Record<string, {
        name: string;
        version: string;
        config: {
            command: string;
            args?: string[] | undefined;
            env?: Record<string, string> | undefined;
        };
        installedAt: string;
        enabled: boolean;
    }>;
    settings: {
        registryUrl: string;
        cacheTimeout: number;
        autoUpdate: boolean;
    };
}, {
    servers?: Record<string, {
        name: string;
        version: string;
        config: {
            command: string;
            args?: string[] | undefined;
            env?: Record<string, string> | undefined;
        };
        installedAt: string;
        enabled?: boolean | undefined;
    }> | undefined;
    settings?: {
        registryUrl?: string | undefined;
        cacheTimeout?: number | undefined;
        autoUpdate?: boolean | undefined;
    } | undefined;
}>;
export type UserConfig = z.infer<typeof UserConfigSchema>;
export interface SearchOptions {
    query?: string;
    category?: string;
    verified?: boolean;
    limit?: number;
    offset?: number;
    sort?: 'downloads' | 'stars' | 'name' | 'updated';
}
export interface InstallOptions {
    version?: string;
    global?: boolean;
    config?: Record<string, string>;
}
export interface CLIContext {
    verbose: boolean;
    json: boolean;
    configPath?: string;
}
export declare const CATEGORIES: {
    readonly devtools: {
        readonly name: "DevTools";
        readonly emoji: "🛠️";
        readonly description: "Developer tools and utilities";
    };
    readonly productivity: {
        readonly name: "Productivity";
        readonly emoji: "📊";
        readonly description: "Boost your workflow";
    };
    readonly data: {
        readonly name: "Data";
        readonly emoji: "📁";
        readonly description: "Data processing and analysis";
    };
    readonly ai: {
        readonly name: "AI";
        readonly emoji: "🤖";
        readonly description: "AI and machine learning";
    };
    readonly communication: {
        readonly name: "Communication";
        readonly emoji: "💬";
        readonly description: "Chat, email, messaging";
    };
    readonly automation: {
        readonly name: "Automation";
        readonly emoji: "⚡";
        readonly description: "Automate workflows";
    };
    readonly security: {
        readonly name: "Security";
        readonly emoji: "🔒";
        readonly description: "Security and authentication";
    };
    readonly cloud: {
        readonly name: "Cloud";
        readonly emoji: "☁️";
        readonly description: "Cloud services";
    };
    readonly database: {
        readonly name: "Database";
        readonly emoji: "🗄️";
        readonly description: "Database tools";
    };
    readonly other: {
        readonly name: "Other";
        readonly emoji: "📦";
        readonly description: "Miscellaneous";
    };
};
export type Category = keyof typeof CATEGORIES;
//# sourceMappingURL=index.d.ts.map