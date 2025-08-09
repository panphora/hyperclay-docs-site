---
title: 11. Hyperclay Local - Desktop App Documentation
publish: true
description: Documentation for Hyperclay Local, a desktop application for running and developing HTML apps locally on your computer
---

A desktop app for running HTML apps locally.

*  **🛠️ Build Without Limits**
	* Self-contained HTML apps. No frameworks needed. Just HTML, CSS, and JavaScript.
* 💾 **Your Apps, Your Computer**
	* Everything runs locally. No cloud dependencies. Perfect for sensitive projects.
* 🍄 **Zero Friction**
	* One click starts your server. No build steps. Edit and refresh instantly.
* 🌍 **Cross-Platform**
	* Works on macOS, Windows, and Linux. Share apps with anyone.

## Why Use Hyperclay Local?

While [hyperclay.com](https://hyperclay.com) provides the full hosted experience with user accounts, version history, and collaboration features, this local server lets you:

✅ **Work offline** - Edit your apps without internet connection  
✅ **Own your data** - Complete independence from any platform  
✅ **No subscription needed** - Run unlimited apps locally for free  
✅ **Privacy first** - Your apps and data never leave your computer  
✅ **Future-proof** - Apps work forever, regardless of service status

## Quick Start

### For Users (Download Pre-built App)

1. **Download** the app for your platform:
   - **macOS**: [Hyperclay-Local-1.0.0.dmg](https://local.hyperclay.com/Hyperclay-Local-1.0.0.dmg)
   - **Windows**: [Hyperclay-Local-Setup-1.0.0.exe](https://local.hyperclay.com/Hyperclay-Local-Setup-1.0.0.exe)
   - **Linux**: [Hyperclay-Local-1.0.0.AppImage](https://local.hyperclay.com/Hyperclay-Local-1.0.0.AppImage)

2. **Install** and run the app
3. **Select your folder** containing HTML apps
4. **Click "Start Server"**
5. **Browser opens** automatically to your apps!

### For Developers (Build from Source)

📦 [GitHub Repository](https://github.com/panphora/hyperclay-local)

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for all platforms
npm run build-all

# Build for specific platform
npm run build-mac     # macOS
npm run build-windows # Windows  
npm run build-linux   # Linux
```

## How It Works

### Server Integration

The app runs an embedded Express.js server (same as the Node.js version) with:
- Static file serving with extensionless HTML support
- POST `/save/:name` endpoint for app self-saving
- Beautiful directory listings
- Security protections (path traversal, filename validation)

### User Interface

#### Main Window
- Header with app name and server status indicator
- Visual folder picker with current selection display
- Start/stop buttons and browser launcher
- Server URL and folder path when running
- Step-by-step usage guide
- Links to Hyperclay.com and documentation

#### System Tray
- Status indicator: Green (running) / Red (stopped)
- Quick actions: Start/stop server, show/hide window
- Background operation: App continues running when window closed

#### Keyboard Shortcuts
- `Cmd/Ctrl + O` *Select folder*
- `Cmd/Ctrl + R` *Start server*
- `Cmd/Ctrl + S` *Stop server*
- `Cmd/Ctrl + W` *Close window (app stays in tray)*
- `Cmd/Ctrl + Q` *Quit app (macOS only)*

## Security Features

- **Sandboxed renderer**: Web content runs in isolated context
- **IPC security**: Secure communication between main and renderer processes
- **Path validation**: Prevents access to files outside selected folder
- **Filename sanitization**: Only allows safe characters in saved files
- **Content validation**: Validates file content before saving

## Troubleshooting

### Installation Issues

#### macOS "App is damaged" error
```bash
xattr -cr "/Applications/Hyperclay-Local.app"
```

#### Windows SmartScreen warning
Click "More info" → "Run anyway" (This happens because the app isn't code-signed)

#### Linux permission denied
```bash
chmod +x Hyperclay-Local-1.0.0.AppImage
```

### Runtime Issues

#### Port 4321 already in use
- The app will show an error dialog
- Kill any existing process using the port
- Or wait for the existing process to terminate

#### Server won't start
- Check the folder contains some files
- Ensure folder path doesn't contain special characters
- Try selecting the folder again

## Links & Resources

- 📦 [GitHub Repository](https://github.com/panphora/local-hyperclay)
- 📖 [Hyperclay Documentation](https://docs.hyperclay.com)
- 🌐 [Hyperclay.com](https://hyperclay.com)

---

Made with ❤️ for Hyperclay - The platform for single-file HTML applications