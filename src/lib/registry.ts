import type { MCPServer, RegistryEntry, SearchOptions } from '../types/index.js';

// Built-in registry of popular MCP servers (GitHub-based discovery)
const BUILTIN_SERVERS: MCPServer[] = [
  // ========== OFFICIAL SERVERS (Anthropic/modelcontextprotocol) ==========
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
    name: '@official/sqlite',
    version: '1.0.0',
    description: 'SQLite database access - local database queries and management',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['sqlite', 'database', 'sql', 'local', 'embedded'],
    categories: ['database', 'data'],
    tools: [
      { name: 'query', description: 'Execute SQL query' },
      { name: 'describe_table', description: 'Get table schema' },
      { name: 'list_tables', description: 'List all tables' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-sqlite', '/path/to/database.db'],
    },
    verified: true,
    downloads: 38000,
    stars: 720,
  },
  {
    name: '@official/memory',
    version: '1.0.0',
    description: 'Knowledge graph-based persistent memory for AI assistants',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['memory', 'knowledge-graph', 'persistence', 'context'],
    categories: ['ai', 'productivity'],
    tools: [
      { name: 'create_entities', description: 'Create entities in the knowledge graph' },
      { name: 'create_relations', description: 'Create relations between entities' },
      { name: 'search_nodes', description: 'Search the knowledge graph' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-memory'],
    },
    verified: true,
    downloads: 32000,
    stars: 580,
  },
  {
    name: '@official/fetch',
    version: '1.0.0',
    description: 'Web content fetching with robots.txt compliance',
    author: 'Anthropic',
    repository: 'https://github.com/modelcontextprotocol/servers',
    homepage: 'https://modelcontextprotocol.io',
    license: 'MIT',
    keywords: ['fetch', 'web', 'http', 'scraping', 'content'],
    categories: ['data', 'devtools'],
    tools: [
      { name: 'fetch', description: 'Fetch content from a URL' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-fetch'],
    },
    verified: true,
    downloads: 45000,
    stars: 890,
  },

  // ========== GITHUB OFFICIAL MCP SERVER ==========
  {
    name: '@github/mcp-server',
    version: '1.0.0',
    description: 'GitHub official MCP Server - comprehensive GitHub API access',
    author: 'GitHub',
    repository: 'https://github.com/github/github-mcp-server',
    license: 'MIT',
    keywords: ['github', 'official', 'api', 'repos', 'actions', 'copilot'],
    categories: ['devtools'],
    tools: [
      { name: 'search_code', description: 'Search code across repositories' },
      { name: 'get_repo', description: 'Get repository details' },
      { name: 'list_workflows', description: 'List GitHub Actions workflows' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@github/mcp-server'],
      env: { GITHUB_TOKEN: '' },
    },
    verified: true,
    downloads: 25000,
    stars: 1100,
  },

  // ========== MICROSOFT PLAYWRIGHT ==========
  {
    name: '@microsoft/playwright-mcp',
    version: '1.0.0',
    description: 'Official Microsoft Playwright MCP server for browser automation',
    author: 'Microsoft',
    repository: 'https://github.com/microsoft/playwright-mcp',
    license: 'MIT',
    keywords: ['playwright', 'browser', 'automation', 'testing', 'microsoft'],
    categories: ['automation', 'devtools'],
    tools: [
      { name: 'navigate', description: 'Navigate to a URL' },
      { name: 'snapshot', description: 'Take accessibility snapshot' },
      { name: 'click', description: 'Click an element' },
      { name: 'fill', description: 'Fill a form field' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@playwright/mcp@latest'],
    },
    verified: true,
    downloads: 22000,
    stars: 950,
  },

  // ========== COMMUNITY SERVERS ==========
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
    author: 'exa-labs',
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
    name: '@community/context7',
    version: '1.0.0',
    description: 'Up-to-date code documentation for LLMs and AI code editors',
    author: 'upstash',
    repository: 'https://github.com/upstash/context7',
    license: 'MIT',
    keywords: ['documentation', 'code', 'context', 'llm', 'knowledge'],
    categories: ['devtools', 'ai'],
    tools: [
      { name: 'get_library_docs', description: 'Get documentation for a library' },
      { name: 'search_docs', description: 'Search documentation' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@upstash/context7-mcp'],
    },
    verified: false,
    downloads: 18000,
    stars: 890,
  },
  {
    name: '@community/n8n',
    version: '1.0.0',
    description: 'n8n workflow automation - build and trigger workflows via MCP',
    author: 'czlonkowski',
    repository: 'https://github.com/czlonkowski/n8n-mcp',
    license: 'MIT',
    keywords: ['n8n', 'workflow', 'automation', 'integration', 'no-code'],
    categories: ['automation', 'productivity'],
    tools: [
      { name: 'create_workflow', description: 'Create a new workflow' },
      { name: 'trigger_workflow', description: 'Trigger an existing workflow' },
      { name: 'list_workflows', description: 'List all workflows' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'n8n-mcp'],
      env: { N8N_API_KEY: '', N8N_URL: '' },
    },
    verified: false,
    downloads: 11000,
    stars: 340,
  },
  {
    name: '@community/youtube-transcript',
    version: '0.3.0',
    description: 'Fetch YouTube subtitles and transcripts for AI analysis',
    author: 'kimtaeyoon83',
    repository: 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript',
    license: 'MIT',
    keywords: ['youtube', 'transcript', 'subtitles', 'video', 'captions'],
    categories: ['data', 'ai'],
    tools: [
      { name: 'get_transcript', description: 'Get transcript for a video' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'mcp-youtube-transcript'],
    },
    verified: false,
    downloads: 9500,
    stars: 210,
  },
  {
    name: '@community/blender',
    version: '0.2.0',
    description: 'Blender 3D integration - create and manipulate 3D scenes',
    author: 'ahujasid',
    repository: 'https://github.com/ahujasid/blender-mcp',
    license: 'MIT',
    keywords: ['blender', '3d', 'modeling', 'animation', 'graphics'],
    categories: ['devtools', 'automation'],
    tools: [
      { name: 'create_object', description: 'Create a 3D object' },
      { name: 'modify_object', description: 'Modify an existing object' },
      { name: 'render_scene', description: 'Render the current scene' },
    ],
    config: {
      command: 'python',
      args: ['-m', 'blender_mcp'],
    },
    verified: false,
    downloads: 7500,
    stars: 280,
  },
  {
    name: '@community/serena',
    version: '1.0.0',
    description: 'Powerful coding agent toolkit with semantic retrieval and editing',
    author: 'oraios',
    repository: 'https://github.com/oraios/serena',
    license: 'MIT',
    keywords: ['coding', 'agent', 'semantic', 'retrieval', 'editing'],
    categories: ['devtools', 'ai'],
    tools: [
      { name: 'search_code', description: 'Semantic code search' },
      { name: 'edit_code', description: 'Edit code with context' },
      { name: 'explain_code', description: 'Explain code functionality' },
    ],
    config: {
      command: 'uvx',
      args: ['serena'],
    },
    verified: false,
    downloads: 8200,
    stars: 450,
  },
  {
    name: '@community/chrome-devtools',
    version: '1.0.0',
    description: 'Chrome DevTools for coding agents - inspect and debug web apps',
    author: 'ChromeDevTools',
    repository: 'https://github.com/ChromeDevTools/chrome-devtools-mcp',
    license: 'Apache-2.0',
    keywords: ['chrome', 'devtools', 'debugging', 'browser', 'inspector'],
    categories: ['devtools', 'automation'],
    tools: [
      { name: 'inspect_element', description: 'Inspect a DOM element' },
      { name: 'get_console_logs', description: 'Get console logs' },
      { name: 'get_network_requests', description: 'Get network requests' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/chrome-devtools-mcp'],
    },
    verified: false,
    downloads: 6800,
    stars: 320,
  },
  {
    name: '@community/gpt-researcher',
    version: '1.0.0',
    description: 'Autonomous research agent that conducts deep research on any topic',
    author: 'assafelovic',
    repository: 'https://github.com/assafelovic/gpt-researcher',
    license: 'MIT',
    keywords: ['research', 'autonomous', 'agent', 'analysis', 'report'],
    categories: ['ai', 'data'],
    tools: [
      { name: 'research', description: 'Conduct deep research on a topic' },
      { name: 'generate_report', description: 'Generate a research report' },
    ],
    config: {
      command: 'python',
      args: ['-m', 'gpt_researcher.mcp'],
      env: { OPENAI_API_KEY: '' },
    },
    verified: false,
    downloads: 14000,
    stars: 890,
  },
  {
    name: '@community/fastapi-mcp',
    version: '0.5.0',
    description: 'Expose FastAPI endpoints as MCP tools with authentication',
    author: 'tadata-org',
    repository: 'https://github.com/tadata-org/fastapi_mcp',
    license: 'MIT',
    keywords: ['fastapi', 'api', 'python', 'rest', 'openapi'],
    categories: ['devtools', 'automation'],
    tools: [
      { name: 'call_endpoint', description: 'Call a FastAPI endpoint' },
    ],
    config: {
      command: 'uvx',
      args: ['fastapi-mcp'],
    },
    verified: false,
    downloads: 5500,
    stars: 210,
  },
  {
    name: '@community/anyquery',
    version: '1.0.0',
    description: 'Query 40+ apps with SQL - local-first universal database',
    author: 'julien040',
    repository: 'https://github.com/julien040/anyquery',
    license: 'AGPL-3.0',
    keywords: ['sql', 'query', 'database', 'universal', 'local-first'],
    categories: ['database', 'data'],
    tools: [
      { name: 'query', description: 'Execute SQL query across apps' },
      { name: 'list_tables', description: 'List available tables' },
    ],
    config: {
      command: 'anyquery',
      args: ['mcp'],
    },
    verified: false,
    downloads: 4200,
    stars: 180,
  },
  {
    name: '@community/spotify',
    version: '0.4.0',
    description: 'Spotify integration - playlists, tracks, and playback control',
    author: 'khglynn',
    repository: 'https://github.com/khglynn/spotify-bulk-actions-mcp',
    license: 'MIT',
    keywords: ['spotify', 'music', 'playlist', 'streaming', 'audio'],
    categories: ['productivity', 'data'],
    tools: [
      { name: 'search_tracks', description: 'Search for tracks' },
      { name: 'create_playlist', description: 'Create a playlist' },
      { name: 'get_recommendations', description: 'Get track recommendations' },
    ],
    config: {
      command: 'uvx',
      args: ['spotify-mcp'],
      env: { SPOTIFY_CLIENT_ID: '', SPOTIFY_CLIENT_SECRET: '' },
    },
    verified: false,
    downloads: 7800,
    stars: 165,
  },
  {
    name: '@community/davinci-resolve',
    version: '0.3.0',
    description: 'DaVinci Resolve integration for video editing and color grading',
    author: 'samuelgursky',
    repository: 'https://github.com/samuelgursky/davinci-resolve-mcp',
    license: 'MIT',
    keywords: ['davinci', 'resolve', 'video', 'editing', 'color-grading'],
    categories: ['automation', 'productivity'],
    tools: [
      { name: 'import_media', description: 'Import media files' },
      { name: 'create_timeline', description: 'Create a new timeline' },
      { name: 'apply_grade', description: 'Apply color grading' },
    ],
    config: {
      command: 'python',
      args: ['-m', 'resolve_mcp'],
    },
    verified: false,
    downloads: 3200,
    stars: 145,
  },
  {
    name: '@community/trigger-dev',
    version: '1.0.0',
    description: 'Build and deploy AI agents and workflows with Trigger.dev',
    author: 'triggerdotdev',
    repository: 'https://github.com/triggerdotdev/trigger.dev',
    license: 'Apache-2.0',
    keywords: ['trigger', 'workflow', 'jobs', 'background', 'automation'],
    categories: ['automation', 'devtools'],
    tools: [
      { name: 'create_job', description: 'Create a background job' },
      { name: 'trigger_job', description: 'Trigger a job' },
      { name: 'get_job_status', description: 'Get job status' },
    ],
    config: {
      command: 'npx',
      args: ['-y', '@trigger.dev/mcp'],
      env: { TRIGGER_API_KEY: '' },
    },
    verified: false,
    downloads: 5100,
    stars: 280,
  },
  {
    name: '@community/mindsdb',
    version: '1.0.0',
    description: 'Connect and unify data across platforms with MindsDB',
    author: 'mindsdb',
    repository: 'https://github.com/mindsdb/mindsdb',
    license: 'GPL-3.0',
    keywords: ['mindsdb', 'ml', 'database', 'ai', 'predictions'],
    categories: ['ai', 'database', 'data'],
    tools: [
      { name: 'query', description: 'Query data with SQL' },
      { name: 'predict', description: 'Make ML predictions' },
      { name: 'train_model', description: 'Train an ML model' },
    ],
    config: {
      command: 'python',
      args: ['-m', 'mindsdb.mcp'],
      env: { MINDSDB_URL: '' },
    },
    verified: false,
    downloads: 6200,
    stars: 420,
  },
  {
    name: '@community/anilist',
    version: '0.2.0',
    description: 'AniList API integration for anime and manga information',
    author: 'yuna0x0',
    repository: 'https://github.com/yuna0x0/anilist-mcp',
    license: 'MIT',
    keywords: ['anilist', 'anime', 'manga', 'myanimelist', 'japan'],
    categories: ['data', 'productivity'],
    tools: [
      { name: 'search_anime', description: 'Search for anime' },
      { name: 'search_manga', description: 'Search for manga' },
      { name: 'get_user_list', description: 'Get user anime/manga list' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'anilist-mcp'],
    },
    verified: false,
    downloads: 2800,
    stars: 95,
  },
  {
    name: '@community/tmdb',
    version: '0.3.0',
    description: 'The Movie Database API - search movies, TV shows, and people',
    author: 'drakonkat',
    repository: 'https://github.com/drakonkat/wizzy-mcp-tmdb',
    license: 'MIT',
    keywords: ['tmdb', 'movies', 'tv', 'entertainment', 'media'],
    categories: ['data', 'productivity'],
    tools: [
      { name: 'search_movies', description: 'Search for movies' },
      { name: 'search_tv', description: 'Search for TV shows' },
      { name: 'get_trending', description: 'Get trending content' },
    ],
    config: {
      command: 'npx',
      args: ['-y', 'wizzy-mcp-tmdb'],
      env: { TMDB_API_KEY: '' },
    },
    verified: false,
    downloads: 4100,
    stars: 125,
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
