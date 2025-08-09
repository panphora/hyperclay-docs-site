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
    
    # Copy all content from hyperclay-docs, preserving folder names and structure exactly
    # Copy root markdown files
    cp ../hyperclay-docs/*.md content/ 2>/dev/null || true
    
    # Copy publish.css and publish.js if they exist  
    cp ../hyperclay-docs/publish.* content/ 2>/dev/null || true
    
    # Copy all directories preserving their exact names (including Ω)
    cp -r ../hyperclay-docs/DOCS content/ 2>/dev/null || true
    cp -r ../hyperclay-docs/MVP content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Assets" content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Backlog" content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Blog post ideas" content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω HTML App Ideas" content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Launch plan" content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Nope" content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Open Questions" content/ 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Server" content/ 2>/dev/null || true
    
    echo "Content synced from ../hyperclay-docs"
else
    echo "Production environment - using existing content"
fi

# Build the Quartz site
npx quartz build

echo "Build complete! Site is ready in public/"