import { describe, it, expect, beforeEach } from 'vitest';
import { Registry, getRegistry } from '../src/lib/registry.js';

describe('Registry', () => {
  let registry: Registry;

  beforeEach(() => {
    registry = new Registry();
  });

  describe('search', () => {
    it('should return all servers when no query provided', async () => {
      const results = await registry.search();
      expect(results.length).toBeGreaterThan(0);
    });

    it('should filter by query string', async () => {
      const results = await registry.search({ query: 'github' });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => 
        r.name.toLowerCase().includes('github') || 
        r.description.toLowerCase().includes('github')
      )).toBe(true);
    });

    it('should filter by category', async () => {
      const results = await registry.search({ category: 'devtools' });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => r.categories.includes('devtools'))).toBe(true);
    });

    it('should filter by verified status', async () => {
      const verified = await registry.search({ verified: true });
      expect(verified.every(r => r.verified === true)).toBe(true);
      
      const unverified = await registry.search({ verified: false });
      expect(unverified.every(r => r.verified === false)).toBe(true);
    });

    it('should sort by downloads (default)', async () => {
      const results = await registry.search();
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].downloads).toBeGreaterThanOrEqual(results[i].downloads);
      }
    });

    it('should sort by name', async () => {
      const results = await registry.search({ sort: 'name' });
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].name.localeCompare(results[i].name)).toBeLessThanOrEqual(0);
      }
    });

    it('should respect pagination limits', async () => {
      const results = await registry.search({ limit: 3 });
      expect(results.length).toBeLessThanOrEqual(3);
    });

    it('should respect pagination offset', async () => {
      const all = await registry.search({ limit: 10 });
      const offset = await registry.search({ offset: 2, limit: 10 });
      expect(offset[0]).toEqual(all[2]);
    });
  });

  describe('get', () => {
    it('should return a server by name', async () => {
      const server = await registry.get('@official/github');
      expect(server).not.toBeNull();
      expect(server?.name).toBe('@official/github');
    });

    it('should return null for non-existent server', async () => {
      const server = await registry.get('@nonexistent/server');
      expect(server).toBeNull();
    });

    it('should return complete server config', async () => {
      const server = await registry.get('@official/filesystem');
      expect(server).toHaveProperty('config');
      expect(server?.config).toHaveProperty('command');
      expect(server?.config).toHaveProperty('args');
    });
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const categories = await registry.getCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should return sorted categories', async () => {
      const categories = await registry.getCategories();
      const sorted = [...categories].sort();
      expect(categories).toEqual(sorted);
    });

    it('should include expected categories', async () => {
      const categories = await registry.getCategories();
      expect(categories).toContain('devtools');
      expect(categories).toContain('productivity');
    });
  });

  describe('getStats', () => {
    it('should return statistics', async () => {
      const stats = await registry.getStats();
      expect(stats).toHaveProperty('totalServers');
      expect(stats).toHaveProperty('totalDownloads');
      expect(stats).toHaveProperty('categories');
    });

    it('should have valid numbers', async () => {
      const stats = await registry.getStats();
      expect(stats.totalServers).toBeGreaterThan(0);
      expect(stats.totalDownloads).toBeGreaterThan(0);
      expect(stats.categories).toBeGreaterThan(0);
    });
  });

  describe('singleton', () => {
    it('should return same instance', () => {
      const instance1 = getRegistry();
      const instance2 = getRegistry();
      expect(instance1).toBe(instance2);
    });
  });
});
