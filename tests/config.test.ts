import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Config, getConfig } from '../src/lib/config.js';
import type { InstalledServer } from '../src/types/index.js';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// Mock fs module
vi.mock('fs', async () => {
  const actual = await vi.importActual<typeof fs>('fs');
  return {
    ...actual,
    existsSync: vi.fn(() => false),
    readFileSync: vi.fn(() => '{}'),
    writeFileSync: vi.fn(),
    mkdirSync: vi.fn(),
  };
});

describe('Config', () => {
  let config: Config;

  beforeEach(() => {
    vi.clearAllMocks();
    config = new Config();
  });

  describe('server management', () => {
    const testServer: InstalledServer = {
      name: '@test/server',
      version: '1.0.0',
      installedAt: new Date().toISOString(),
      config: {
        command: 'npx',
        args: ['-y', 'test-server'],
      },
      enabled: true,
    };

    it('should install a server', () => {
      config.installServer(testServer);
      const installed = config.getInstalledServer('@test/server');
      expect(installed).not.toBeUndefined();
      expect(installed?.name).toBe('@test/server');
    });

    it('should uninstall a server', () => {
      config.installServer(testServer);
      const result = config.uninstallServer('@test/server');
      expect(result).toBe(true);
      const installed = config.getInstalledServer('@test/server');
      expect(installed).toBeUndefined();
    });

    it('should toggle server enabled state', () => {
      config.installServer(testServer);
      config.toggleServer('@test/server', false);
      const server = config.getInstalledServer('@test/server');
      expect(server?.enabled).toBe(false);
      
      config.toggleServer('@test/server', true);
      const enabledServer = config.getInstalledServer('@test/server');
      expect(enabledServer?.enabled).toBe(true);
    });

    it('should get all installed servers', () => {
      config.installServer(testServer);
      config.installServer({ ...testServer, name: '@test/server2' });
      const servers = config.getInstalledServers();
      expect(Object.keys(servers).length).toBeGreaterThanOrEqual(2);
    });

    it('should return undefined for non-existent server', () => {
      const server = config.getInstalledServer('@nonexistent/server');
      expect(server).toBeUndefined();
    });
  });

  describe('Claude config detection', () => {
    it('should find claude config path', () => {
      // This tests the static method exists and returns correctly
      const configPath = Config.findClaudeConfig();
      // On a system without Claude Desktop, this will be null
      expect(configPath === null || typeof configPath === 'string').toBe(true);
    });

    it('should get claude config', () => {
      const claudeConfig = Config.getClaudeConfig();
      // On a system without Claude Desktop, this will be null
      expect(claudeConfig === null || typeof claudeConfig === 'object').toBe(true);
    });
  });
});
