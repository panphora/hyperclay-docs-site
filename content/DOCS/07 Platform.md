---
title: Platform
publish: true
description: Overview of Hyperclay platform features including code editor, version control, custom domains, and hosting capabilities
---

## Platform Features

Hyperclay provides essential tools for creating and managing HTML apps without the complexity of traditional web development infrastructure.

### Code Editor

The code editor is available at the `/edit` route of each HTML app (e.g., `yourapp.hyperclay.com/edit`).

**Features:**
- Mobile-friendly interface that works on any device
- Syntax highlighting for HTML, CSS, and JavaScript
- Auto-indentation and bracket matching
- Line numbers and search functionality
- Real-time preview of your changes

**Alternative: Browser DevTools**

Many developers prefer using the browser's built-in Developer Tools as their editor:
1. Open your HTML app in view mode
2. Press F12 to open DevTools
3. Navigate to the Elements panel
4. Edit HTML directly by double-clicking elements
5. Changes persist when you save (if you're the owner)

### Upload Files and Images

Hyperclay supports file uploads directly within your HTML apps.

```js
hyperclay.uploadFile(eventOrFile); // Uploads a file from either a file input event or File object, showing progress toasts and copying the URL on completion
```

**File limits:**
- Maximum file size: 10MB per upload
- Supported formats: Images (JPG, PNG, GIF), documents, and other common file types
- Files are organized by path in your dashboard for easy management

**Using uploads in your app:**
```html
<img src="/uploads/{username}/my-image.png" alt="My uploaded image">
```

### Form Submissions

Handle form submissions from users without a backend using the `sendMessage` method.

**Basic contact form:**
```js
hyperclay.sendMessage(eventOrObj, successMessage, successCallback?) 
```

Sends a message from an anonymous viewer to the app owner's Hyperclay account, but only if the sender is likely to be human and not a bot. If passing in a submit `event`, all form fields will be sent. Otherwise, object will be converted to JSON and sent.

### Custom Domains

Each Hyperclay app automatically gets a subdomain:
- `yourappname.hyperclay.com`

**Custom domain support**:
- Connect your own domain (e.g., `myapp.com`)
- Automatic SSL certificates
- No DNS configuration complexity

### Hosting Locally

Run Hyperclay apps on your own machine for development or offline use.

**Option 1: Direct file access**
1. Download your HTML app file
2. Open it in a web browser
3. Works immediately (though without save persistence)

**Option 2: Hyperclay Local**
- Desktop application for full local hosting
- Maintains save/edit functionality
- Perfect for development and testing
- See the [Hyperclay Local documentation](11%20Hyperclay%20Local%20-%20Desktop%20App%20Documentation.md) for details

### Hosting on Your Own Server

Hyperclay apps are just HTML files, so they work on any web server.

**Basic hosting:**
1. Download your HTML app
2. Upload to any static file host (GitHub Pages, Netlify, Vercel, etc.)
3. The app works immediately in view mode

**Advanced hosting with persistence:**
To enable edit/save functionality on your own server, you'll need:
- A simple backend to handle save requests
- Basic authentication for edit permissions
- File write capabilities

### Integrate with Other Services

Hyperclay apps can connect to external services and APIs.

**Using fetch for API calls:**
```html
<script>
async function loadData() {
	const response = await fetch('https://api.example.com/data');
	const data = await response.json();
	document.getElementById('content').innerHTML = data.content;
}
</script>
```

**Function-as-a-Service integration:**
Services like Val.town let you add backend functionality without managing servers:

```html
<script>
// Call a Val.town function
async function processData() {
	const response = await fetch('https://api.val.town/v1/run/yourname.yourfunction');
	const result = await response.json();
	// Use the result in your app
}
</script>
```

**CORS considerations:**
When integrating external services, ensure they support CORS or use services designed for client-side access.