# Hyperclay Documentation Site

This repository contains the Quartz 4 setup for building the Hyperclay documentation website, deployed to Cloudflare Pages at [docs.hyperclay.com](https://docs.hyperclay.com).

## 📁 Repository Structure

```
hyper/
├── hyperclay-docs/        # Obsidian vault with source documentation
└── hyperclay-site/        # This repo - Quartz 4 site generator
    ├── build-smart.sh     # Smart build script (auto-detects environment)
    ├── content/           # Documentation content
    ├── public/            # Built static site (gitignored)
    └── quartz.config.ts   # Site configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- The `hyperclay-docs` repository cloned as a **sibling directory**
- Git

### Initial Setup

```bash
# Clone this repo
git clone https://github.com/panphora/hyperclay-docs-site.git
cd hyperclay-docs-site

# Install dependencies
npm install

# Build the site (auto-syncs from ../hyperclay-docs if available)
npm run build
```

### Local Development

```bash
# Serve site locally with hot reload
npx quartz build --serve

# Site will be available at http://localhost:8080
```

## 🔄 Development Workflow

1. **Edit documentation** in the `../hyperclay-docs/` Obsidian vault
2. **Build the site** with `npm run build` (auto-syncs changes)
3. **Preview locally** at http://localhost:8080
4. **Commit and push** changes to trigger deployment

## 📦 Build Process

The `npm run build` command uses a smart build script that:
1. **Detects environment** - Checks if `../hyperclay-docs` exists
2. **Local mode** - If docs exist, syncs content from `../hyperclay-docs/`
3. **Production mode** - If no local docs, builds from existing `content/`
4. **Builds site** - Runs Quartz to generate static site in `public/`

## ☁️ Cloudflare Pages Deployment

### Initial Cloudflare Setup

1. **Connect Repository**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Create a new project
   - Connect your GitHub account
   - Select `hyperclay-docs-site` repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Build output directory**: `public`
   - **Root directory**: `/` (leave as default)
   - **Node.js version**: `18` or higher

3. **Environment Variables** (if needed)
   - Add any required environment variables in Cloudflare Pages settings

4. **Custom Domain**
   - Add `docs.hyperclay.com` as custom domain
   - Configure DNS in Cloudflare DNS settings

### Build Configuration

The site uses a single, unified build command:
- **`npm run build`** - Works everywhere (auto-detects local vs production)

### Deployment Process

**Automatic Deployment** (Recommended):
- Push to `main` branch triggers automatic deployment
- Cloudflare Pages builds and deploys the site
- Changes appear at docs.hyperclay.com within 2-3 minutes

**Manual Deployment**:
```bash
# Build and sync from local docs
npm run build

# Commit changes
git add -A
git commit -m "Update documentation"
git push origin main
```

## 🛠 Customization

### Site Configuration
Edit `quartz.config.ts` to customize:
- Site title and metadata
- Base URL
- Theme colors and fonts
- Plugin settings

### Content Structure
- **Homepage**: `content/index.md` (generated from build)
- **Documentation**: Synced from `../hyperclay-docs/DOCS/`
- **Assets**: Copied from `../hyperclay-docs/Ω Assets/`

### Styling
- **Global styles**: `quartz/styles/custom.scss`
- **Component styles**: `quartz/components/styles/`

## 📝 Important Notes

### Git Configuration
- `content/` folder is gitignored (generated from source)
- `public/` folder is gitignored (build output)
- Only commit Quartz configuration and customizations

### Folder Structure
All folder names are preserved exactly as they appear in the source, including special characters like Ω.

### Updates
To update Quartz itself:
```bash
# Check for updates
npm outdated

# Update dependencies
npm update
```

## 🔧 Troubleshooting

### Build Fails on Cloudflare
- Ensure Node.js version is set to 18+ in Cloudflare Pages settings
- Check build logs in Cloudflare Pages dashboard
- Verify all dependencies are in `package.json`

### Content Not Updating
- Make sure `hyperclay-docs` is in the correct location (`../hyperclay-docs`)
- Run `npm run build` to sync latest content
- Clear browser cache if changes don't appear

### Local Development Issues
```bash
# Clean build
rm -rf public/*
npm run build

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- **Source Docs**: [hyperclay-docs](https://github.com/panphora/hyperclay-docs)
- **Live Site**: [docs.hyperclay.com](https://docs.hyperclay.com)
- **Quartz Documentation**: [quartz.jzhao.xyz](https://quartz.jzhao.xyz/)
- **Cloudflare Pages Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)

## 📄 License

The documentation content is proprietary to Hyperclay. The Quartz framework is MIT licensed.
