import type { MCPServer, RegistryEntry, SearchOptions } from '../types/index.js';

// Built-in registry of popular MCP servers (GitHub-based discovery)
const BUILTIN_SERVERS: MCPServer[] = [
  {
    name: '@official/github',
    version: '1.0.0',
    description: 'GitHub integration - repos, issues, PRs, and code search',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['github', 'git', 'code', 'repository', 'issues', 'pull-requests'],
    categories: ['devtools'],
    tools: [
      { name: 'search_repositories', description: 'Search GitHub repositories' },
      { name: 'get_file_contents', description: 'Get contents of a file' },
      { name: 'create_issue', description: 'Create a new issue' },
      { name: 'create_pull_request', description: 'Create a pull request' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: { GITHUB_TOKEN: '' },
    },
    verified: true,
    downloads: 50000,
    stars: 1200,
  },
  {
    name: '@official/filesystem',
    version: '1.0.0',
    description: 'Secure file system access with configurable permissions',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['filesystem', 'files', 'directories', 'read', 'write'],
    categories: ['devtools', 'productivity'],
    tools: [
      { name: 'read_file', description: 'Read a file from disk' },
      { name: 'write_file', description: 'Write content to a file' },
      { name: 'list_directory', description: 'List directory contents' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/allowed'],
    },
    verified: true,
    downloads: 75000,
    stars: 1500,
  },
  {
    name: '@official/puppeteer',
    version: '1.0.0',
    description: 'Browser automation with Puppeteer - screenshots, scraping, testing',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['puppeteer', 'browser', 'automation', 'scraping', 'screenshots'],
    categories: ['automation', 'devtools'],
    tools: [
      { name: 'navigate', description: 'Navigate to a URL' },
      { name: 'screenshot', description: 'Take a screenshot' },
      { name: 'click', description: 'Click an element' },
      { name: 'evaluate', description: 'Execute JavaScript' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-puppeteer'],
    },
    verified: true,
    downloads: 35000,
    stars: 800,
  },
  {
    name: '@official/slack',
    version: '1.0.0',
    description: 'Slack integration - channels, messages, users, and reactions',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['slack', 'chat', 'messaging', 'communication', 'workspace'],
    categories: ['communication', 'productivity'],
    tools: [
      { name: 'list_channels', description: 'List Slack channels' },
      { name: 'post_message', description: 'Post a message' },
      { name: 'get_channel_history', description: 'Get channel history' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-slack'],
      env: { SLACK_TOKEN: '' },
    },
    verified: true,
    downloads: 28000,
    stars: 650,
  },
  {
    name: '@official/postgres',
    version: '1.0.0',
    description: 'PostgreSQL database access - queries, schema inspection, and more',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['postgres', 'postgresql', 'database', 'sql', 'queries'],
    categories: ['database', 'data'],
    tools: [
      { name: 'query', description: 'Execute SQL query' },
      { name: 'describe_table', description: 'Get table schema' },
      { name: 'list_tables', description: 'List all tables' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres'],
      env: { DATABASE_URL: '' },
    },
    verified: true,
    downloads: 42000,
    stars: 950,
  },
  {
    name: '@community/notion',
    version: '0.5.0',
    description: 'Notion workspace integration - pages, databases, and blocks',
    author: 'community',
    repository: 'https://github.com/makenotion/notion-mcp-server',
    license: 'MIT',
    keywords: ['notion', 'notes', 'wiki', 'database', 'workspace'],
    categories: ['productivity', 'data'],
    tools: [
      { name: 'search', description: 'Search Notion pages' },
      { name: 'get_page', description: 'Get page content' },
      { name: 'create_page', description: 'Create a new page' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'notion-mcp-server'],
      env: { NOTION_TOKEN: '' },
    },
    verified: false,
    downloads: 15000,
    stars: 320,
  },
  {
    name: '@community/linear',
    version: '0.3.0',
    description: 'Linear issue tracking - issues, projects, and team management',
    author: 'community',
    repository: 'https://github.com/jerhadf/linear-mcp-server',
    license: 'MIT',
    keywords: ['linear', 'issues', 'project-management', 'tracking', 'agile'],
    categories: ['devtools', 'productivity'],
    tools: [
      { name: 'list_issues', description: 'List Linear issues' },
      { name: 'create_issue', description: 'Create a new issue' },
      { name: 'update_issue', description: 'Update an issue' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'linear-mcp-server'],
      env: { LINEAR_API_KEY: '' },
    },
    verified: false,
    downloads: 8000,
    stars: 180,
  },
  {
    name: '@community/brave-search',
    version: '0.4.0',
    description: 'Brave Search API - web search with privacy',
    author: 'community',
    repository: 'https://github.com/AurimarL/brave-mcp-server',
    license: 'MIT',
    keywords: ['brave', 'search', 'web', 'privacy', 'internet'],
    categories: ['data', 'ai'],
    tools: [
      { name: 'web_search', description: 'Search the web' },
      { name: 'news_search', description: 'Search news' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'brave-mcp-server'],
      env: { BRAVE_API_KEY: '' },
    },
    verified: false,
    downloads: 12000,
    stars: 250,
  },
  {
    name: '@community/exa',
    version: '0.2.0',
    description: 'Exa AI-powered search - semantic search for the web',
    author: 'community',
    repository: 'https://github.com/exa-labs/exa-mcp-server',
    license: 'MIT',
    keywords: ['exa', 'search', 'ai', 'semantic', 'neural'],
    categories: ['ai', 'data'],
    tools: [
      { name: 'search', description: 'Semantic web search' },
      { name: 'find_similar', description: 'Find similar content' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'exa-mcp-server'],
      env: { EXA_API_KEY: '' },
    },
    verified: false,
    downloads: 6000,
    stars: 120,
  },
  {
    name: '@community/memory',
    version: '0.1.0',
    description: 'Persistent memory for conversations - remember across sessions',
    author: 'community',
    repository: 'https://github.com/mem0ai/mem0-mcp-server',
    license: 'MIT',
    keywords: ['memory', 'persistence', 'context', 'remember', 'history'],
    categories: ['ai', 'productivity'],
    tools: [
      { name: 'save_memory', description: 'Save to memory' },
      { name: 'recall', description: 'Recall from memory' },
      { name: 'search_memory', description: 'Search memories' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'mem0-mcp-server'],
    },
    verified: false,
    downloads: 9000,
    stars: 200,
  },
];

export class Registry {
  private servers: MCPServer[] = BUILTIN_SERVERS;
  private registryUrl: string;
  private cacheTimeout: number;
  private lastFetch: number = 0;

  constructor(registryUrl = 'https://registry.mcphub.dev', cacheTimeout = 3600) {
    this.registryUrl = registryUrl;
    this.cacheTimeout = cacheTimeout;
  }

  async search(options: SearchOptions = {}): Promise<RegistryEntry[]> {
    let results = this.servers;

    // Filter by query
    if (options.query) {
      const query = options.query.toLowerCase();
      results = results.filter(server =>
        server.name.toLowerCase().includes(query) ||
        server.description.toLowerCase().includes(query) ||
        server.keywords.some(k => k.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (options.category) {
      const category = options.category.toLowerCase();
      results = results.filter(server =>
        server.categories.some(c => c.toLowerCase() === category)
      );
    }

    // Filter by verified
    if (options.verified !== undefined) {
      results = results.filter(server => server.verified === options.verified);
    }

    // Sort
    const sort = options.sort || 'downloads';
    results = [...results].sort((a, b) => {
      switch (sort) {
        case 'downloads':
          return b.downloads - a.downloads;
        case 'stars':
          return b.stars - a.stars;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
          return (b.updatedAt || '').localeCompare(a.updatedAt || '');
        default:
          return 0;
      }
    });

    // Pagination
    const offset = options.offset || 0;
    const limit = options.limit || 20;
    results = results.slice(offset, offset + limit);

    // Convert to registry entries
    return results.map(server => ({
      name: server.name,
      version: server.version,
      description: server.description,
      author: server.author,
      categories: server.categories,
      downloads: server.downloads,
      stars: server.stars,
      verified: server.verified,
      repository: server.repository,
    }));
  }

  async get(name: string): Promise<MCPServer | null> {
    return this.servers.find(s => s.name === name) || null;
  }

  async getCategories(): Promise<string[]> {
    const categories = new Set<string>();
    for (const server of this.servers) {
      for (const cat of server.categories) {
        categories.add(cat);
      }
    }
    return Array.from(categories).sort();
  }

  async getStats(): Promise<{ totalServers: number; totalDownloads: number; categories: number }> {
    return {
      totalServers: this.servers.length,
      totalDownloads: this.servers.reduce((sum, s) => sum + s.downloads, 0),
      categories: (await this.getCategories()).length,
    };
  }

  // For future: fetch from remote registry
  async refresh(): Promise<void> {
    // In a full implementation, this would fetch from the registry API
    // For now, we use the built-in servers
    this.lastFetch = Date.now();
  }
}

// Singleton instance
let registryInstance: Registry | null = null;

export function getRegistry(url?: string, cacheTimeout?: number): Registry {
  if (!registryInstance) {
    registryInstance = new Registry(url, cacheTimeout);
  }
  return registryInstance;
}
