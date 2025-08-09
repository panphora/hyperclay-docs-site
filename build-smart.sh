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
    
    # Copy main markdown files from hyperclay-docs root
    cp ../hyperclay-docs/*.md content/ 2>/dev/null || true
    
    # Copy DOCS folder
    cp -r ../hyperclay-docs/DOCS content/ 2>/dev/null || true
    
    # Copy MVP folder
    cp -r ../hyperclay-docs/MVP content/ 2>/dev/null || true
    
    # Copy assets folder (renamed to remove special character)
    cp -r "../hyperclay-docs/Ω Assets" "content/Assets" 2>/dev/null || true
    
    # Copy other Ω folders (renaming to remove special character)
    cp -r "../hyperclay-docs/Ω Backlog" "content/Backlog" 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Blog post ideas" "content/Blog post ideas" 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω HTML App Ideas" "content/HTML App Ideas" 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Launch plan" "content/Launch plan" 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Nope" "content/Nope" 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Open Questions" "content/Open Questions" 2>/dev/null || true
    cp -r "../hyperclay-docs/Ω Server" "content/Server" 2>/dev/null || true
    
    echo "Content synced from ../hyperclay-docs"
else
    echo "Production environment - using existing content"
fi

# Build the Quartz site
npx quartz build

echo "Build complete! Site is ready in public/"