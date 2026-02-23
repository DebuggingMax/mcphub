import { z } from 'zod';

// MCP Server Schema
export const MCPServerSchema = z.object({
  name: z.string().min(1).max(100),
  version: z.string().regex(/^\d+\.\d+\.\d+(-[\w.]+)?$/),
  description: z.string().max(500),
  author: z.string(),
  repository: z.string().url(),
  homepage: z.string().url().optional(),
  license: z.string().default('MIT'),
  keywords: z.array(z.string()).default([]),
  categories: z.array(z.enum([
    'devtools',
    'productivity',
    'data',
    'ai',
    'communication',
    'automation',
    'security',
    'cloud',
    'database',
    'other'
  ])).default(['other']),
  tools: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })).optional(),
  resources: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })).optional(),
  prompts: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })).optional(),
  config: z.object({
    command: z.string(),
    args: z.array(z.string()).optional(),
    env: z.record(z.string()).optional(),
  }),
  verified: z.boolean().default(false),
  downloads: z.number().default(0),
  stars: z.number().default(0),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type MCPServer = z.infer<typeof MCPServerSchema>;

// Registry Entry (lightweight for search)
export const RegistryEntrySchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  author: z.string(),
  categories: z.array(z.string()),
  downloads: z.number(),
  stars: z.number(),
  verified: z.boolean(),
  repository: z.string(),
});

export type RegistryEntry = z.infer<typeof RegistryEntrySchema>;

// Installed Server
export const InstalledServerSchema = z.object({
  name: z.string(),
  version: z.string(),
  installedAt: z.string().datetime(),
  config: z.object({
    command: z.string(),
    args: z.array(z.string()).optional(),
    env: z.record(z.string()).optional(),
  }),
  enabled: z.boolean().default(true),
});

export type InstalledServer = z.infer<typeof InstalledServerSchema>;

// User Config
export const UserConfigSchema = z.object({
  servers: z.record(InstalledServerSchema).default({}),
  settings: z.object({
    registryUrl: z.string().url().default('https://registry.mcphub.dev'),
    cacheTimeout: z.number().default(3600),
    autoUpdate: z.boolean().default(true),
  }).default({}),
});

export type UserConfig = z.infer<typeof UserConfigSchema>;

// Search Options
export interface SearchOptions {
  query?: string;
  category?: string;
  verified?: boolean;
  limit?: number;
  offset?: number;
  sort?: 'downloads' | 'stars' | 'name' | 'updated';
}

// Install Options
export interface InstallOptions {
  version?: string;
  global?: boolean;
  config?: Record<string, string>;
}

// CLI Context
export interface CLIContext {
  verbose: boolean;
  json: boolean;
  configPath?: string;
}

// Categories with metadata
export const CATEGORIES = {
  devtools: { name: 'DevTools', emoji: '🛠️', description: 'Developer tools and utilities' },
  productivity: { name: 'Productivity', emoji: '📊', description: 'Boost your workflow' },
  data: { name: 'Data', emoji: '📁', description: 'Data processing and analysis' },
  ai: { name: 'AI', emoji: '🤖', description: 'AI and machine learning' },
  communication: { name: 'Communication', emoji: '💬', description: 'Chat, email, messaging' },
  automation: { name: 'Automation', emoji: '⚡', description: 'Automate workflows' },
  security: { name: 'Security', emoji: '🔒', description: 'Security and authentication' },
  cloud: { name: 'Cloud', emoji: '☁️', description: 'Cloud services' },
  database: { name: 'Database', emoji: '🗄️', description: 'Database tools' },
  other: { name: 'Other', emoji: '📦', description: 'Miscellaneous' },
} as const;

export type Category = keyof typeof CATEGORIES;
