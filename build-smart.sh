#!/bin/bash

# Smart build script that detects environment
# If ../hyperclay-docs exists, sync from it (local development)
# Otherwise, just build from existing content (Cloudflare Pages)

if [ -d "../hyperclay-docs" ]; then
    echo "Local environment detected - syncing from ../hyperclay-docs"
    
    # Clean existing content (but preserve index.md)
    if [ -f content/index.md ]; then
        cp content/index.md /tmp/index.md.backup
    fi
    rm -rf content/*
    if [ -f /tmp/index.md.backup ]; then
        cp /tmp/index.md.backup content/index.md
        rm /tmp/index.md.backup
    fi
    
    # Copy everything from hyperclay-docs, preserving structure
    cp -r ../hyperclay-docs/* content/ 2>/dev/null || true
    
    # Remove .git and .obsidian if they were copied
    rm -rf content/.git content/.obsidian content/.space 2>/dev/null || true
    
    echo "Content synced from ../hyperclay-docs"
else
    echo "Production environment - using existing content"
fi

# Build the Quartz site
npx quartz build

echo "Build complete! Site is ready in public/"