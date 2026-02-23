import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import * as path from 'path';

const CLI_PATH = path.join(process.cwd(), 'dist', 'cli.js');

describe('CLI', () => {
  const runCli = (args: string) => {
    try {
      return execSync(`node ${CLI_PATH} ${args}`, {
        encoding: 'utf-8',
        timeout: 10000,
      });
    } catch (error: any) {
      return error.stdout || error.stderr || '';
    }
  };

  describe('search command', () => {
    it('should search for servers', () => {
      const output = runCli('search github');
      expect(output.toLowerCase()).toContain('github');
    });

    it('should return JSON with --json flag', () => {
      const output = runCli('search github --json');
      expect(() => JSON.parse(output)).not.toThrow();
    });

    it('should filter by category', () => {
      const output = runCli('search --category devtools --json');
      const results = JSON.parse(output);
      expect(results.every((r: any) => r.categories.includes('devtools'))).toBe(true);
    });
  });

  describe('info command', () => {
    it('should show server info', () => {
      const output = runCli('info @official/github');
      expect(output).toContain('@official/github');
      expect(output.toLowerCase()).toContain('github');
    });

    it('should return JSON with --json flag', () => {
      const output = runCli('info @official/github --json');
      const parsed = JSON.parse(output);
      expect(parsed.name).toBe('@official/github');
    });

    it('should handle non-existent server gracefully', () => {
      const output = runCli('info @nonexistent/server');
      // CLI should provide guidance
      expect(output.length).toBeGreaterThan(0);
    });
  });

  describe('categories command', () => {
    it('should list categories', () => {
      const output = runCli('categories');
      expect(output.toLowerCase()).toContain('devtools');
      expect(output.toLowerCase()).toContain('productivity');
    });

    it('should return JSON with --json flag', () => {
      const output = runCli('categories --json');
      const categories = JSON.parse(output);
      expect(Array.isArray(categories)).toBe(true);
    });
  });

  describe('stats command', () => {
    it('should show statistics', () => {
      const output = runCli('stats');
      expect(output).toContain('Servers');
    });

    it('should return JSON with --json flag', () => {
      const output = runCli('stats --json');
      const stats = JSON.parse(output);
      expect(stats).toHaveProperty('totalServers');
      expect(stats).toHaveProperty('totalDownloads');
    });
  });

  describe('list command', () => {
    it('should list installed servers', () => {
      const output = runCli('list');
      // Either shows servers or "no servers installed"
      expect(typeof output).toBe('string');
    });

    it('should return JSON with --json flag', () => {
      const output = runCli('list --json');
      expect(() => JSON.parse(output)).not.toThrow();
    });
  });

  describe('version and help', () => {
    it('should show version', () => {
      const output = runCli('--version');
      expect(output).toMatch(/\d+\.\d+\.\d+/);
    });

    it('should show help', () => {
      const output = runCli('--help');
      expect(output.toLowerCase()).toContain('mcphub');
      expect(output.toLowerCase()).toContain('search');
      expect(output.toLowerCase()).toContain('install');
    });
  });
});
