#!/bin/bash

# Node.js Version Check Script for StoryWave
# This script ensures you're using a compatible Node.js version

echo "🚀 StoryWave - Node.js Version Check"
echo "======================================"

# Check current Node.js version
CURRENT_NODE_VERSION=$(node --version | sed 's/v//')
CURRENT_NPM_VERSION=$(npm --version)

echo "📋 Current Versions:"
echo "   Node.js: v$CURRENT_NODE_VERSION"
echo "   npm: v$CURRENT_NPM_VERSION"

# Check if Node.js version is >= 20.0.0 (recommended minimum)
REQUIRED_NODE_MAJOR=20
CURRENT_NODE_MAJOR=$(echo $CURRENT_NODE_VERSION | cut -d. -f1)

echo ""
echo "🔍 Version Check:"

if [ "$CURRENT_NODE_MAJOR" -ge "$REQUIRED_NODE_MAJOR" ]; then
    echo "   ✅ Node.js version is compatible (v$CURRENT_NODE_VERSION >= v$REQUIRED_NODE_MAJOR)"
    echo "   ✅ Your builds will continue working after September 1, 2025"
else
    echo "   ❌ Node.js version is too old (v$CURRENT_NODE_VERSION < v$REQUIRED_NODE_MAJOR)"
    echo "   ⚠️  Your builds may fail after September 1, 2025"
    echo ""
    echo "📝 To update Node.js:"
    echo "   Using nvm: nvm install --lts && nvm use --lts"
    echo "   Or download from: https://nodejs.org/"
fi

# Check if nvm is available
if command -v nvm &> /dev/null; then
    echo ""
    echo "📦 Node Version Manager (nvm) is available"
    echo "   To install latest LTS: nvm install --lts"
    echo "   To use latest LTS: nvm use --lts"
fi

echo ""
echo "🏁 Done! Your StoryWave project is ready to go!"