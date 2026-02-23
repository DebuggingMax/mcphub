#!/bin/bash
# MCP Hub Demo Script
# This generates a demo output for README/marketing

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}$ ${GREEN}npm install -g mcphub${NC}"
echo "added 89 packages in 2.1s"
echo ""
sleep 0.3

echo -e "${CYAN}$ ${GREEN}mcphub search github${NC}"
sleep 0.5
echo ""
echo "  🔍 Search Results for \"github\""
echo ""
echo "  @official/github         v1.0.0  ✓ verified"
echo "  GitHub integration - repos, issues, PRs, and code search"
echo "  ⬇️  50K  ⭐ 1.2K  📁 devtools"
echo ""
echo "  @github/mcp-server       v1.0.0  ✓ verified"  
echo "  GitHub official MCP Server - comprehensive GitHub API access"
echo "  ⬇️  25K  ⭐ 1.1K  📁 devtools"
echo ""
echo "  Found 2 servers matching \"github\""
echo ""
sleep 0.5

echo -e "${CYAN}$ ${GREEN}mcphub install @official/github${NC}"
sleep 0.3
echo ""
echo "  📦 Installing @official/github..."
echo ""
echo "  This server requires environment variables:"
echo ""
echo -e "  ${YELLOW}GITHUB_TOKEN${NC}: Enter your GitHub token"
echo "  > ghp_xxxxxxxxxxxxxxxxxxxx"
echo ""
echo "  ✅ Installed @official/github v1.0.0"
echo "  ✅ Updated Claude Desktop config"
echo ""
echo "  💡 Restart Claude Desktop to use this server"
echo ""
sleep 0.5

echo -e "${CYAN}$ ${GREEN}mcphub list${NC}"
sleep 0.3
echo ""
echo "  📋 Installed MCP Servers"
echo ""
echo "  @official/github    v1.0.0  ✅ enabled"
echo "  @official/postgres  v1.0.0  ✅ enabled"
echo "  @community/notion   v0.5.0  ⏸️  disabled"
echo ""
echo "  Total: 3 servers (2 enabled)"
echo ""
sleep 0.5

echo -e "${CYAN}$ ${GREEN}mcphub stats${NC}"
sleep 0.3
echo ""
echo "  📊 MCP Hub Statistics"
echo ""
echo "  Servers:    29"
echo "  Downloads:  546.9K"
echo "  Categories: 7"
echo ""
echo "  Registry: https://registry.mcphub.dev"
echo "  GitHub:   https://github.com/DebuggingMax/mcphub"
echo ""

echo -e "${GREEN}✨ MCP Hub - The npm for AI Tools${NC}"
