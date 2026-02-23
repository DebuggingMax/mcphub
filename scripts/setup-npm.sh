#!/bin/bash
# MCP Hub npm Publishing Setup
# Run this script to set up npm authentication and publish

echo "🔌 MCP Hub npm Publishing Setup"
echo "================================"
echo ""

# Check if already logged in
if npm whoami 2>/dev/null; then
    echo "✅ Already logged in as: $(npm whoami)"
else
    echo "📝 Please log in to npm:"
    echo ""
    npm login
fi

echo ""
echo "🏗️  Building package..."
npm run build

echo ""
echo "🧪 Running tests..."
npm test

echo ""
read -p "📦 Ready to publish? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Publishing to npm..."
    npm publish --access public
    echo ""
    echo "✅ Published! Package available at:"
    echo "   https://www.npmjs.com/package/mcphub"
else
    echo "⏸️  Publishing cancelled."
fi
