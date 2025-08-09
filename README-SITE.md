# Hyperclay Documentation Site

This repository contains the Quartz 4 setup for building the Hyperclay documentation website.

## Structure

- **Source Documentation**: Lives in `../hyperclay-docs/` (Obsidian vault)
- **Site Generator**: This repository (Quartz 4)
- **Build Output**: `public/` directory (gitignored)
- **Content**: `content/` directory (gitignored, generated from source)

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm
- The `hyperclay-docs` repository cloned as a sibling directory

### Building the Site

```bash
# Install dependencies
npm install

# Build the site (copies docs and builds)
./build.sh

# Or serve locally for development
npx quartz build --serve
```

### Development Workflow

1. Edit documentation in the `hyperclay-docs` Obsidian vault
2. Run `./build.sh` to copy changes and rebuild
3. Check the output in `public/`

### Deployment

The site can be deployed to GitHub Pages:

```bash
npx quartz build
```

Then configure GitHub Pages to serve from the `public` directory.

## How It Works

The `build.sh` script:
1. Clears the `content/` directory
2. Copies all markdown files and folders from `../hyperclay-docs/`
3. Renames folders with special characters (Ω → removed)
4. Runs Quartz build to generate the static site

## Customization

- **Site Configuration**: Edit `quartz.config.ts`
- **Layout**: Edit `quartz.layout.ts`
- **Styles**: Edit files in `quartz/styles/`

## Repository Links

- **Documentation Source**: [hyperclay-docs](../hyperclay-docs)
- **Live Site**: [GitHub Pages URL]
- **Quartz Documentation**: [Quartz 4](https://quartz.jzhao.xyz/)