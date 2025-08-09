#!/bin/bash
# Build script for Cloudflare Pages
# This runs in Cloudflare's environment where the hyperclay-docs repo isn't available
# Content should be committed to the repo for Cloudflare builds

echo "Building Quartz site for Cloudflare Pages..."

# Check if content directory exists and has files
if [ -d "content" ] && [ "$(ls -A content)" ]; then
    echo "Content directory found with files"
    npx quartz build
else
    echo "Warning: Content directory is empty or missing"
    echo "For Cloudflare deployments, content must be committed to the repository"
    exit 1
fi

echo "Build complete!"