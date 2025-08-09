---
title: 12. FAQ
publish: true
description: Frequently asked questions about Hyperclay, covering core concepts, capabilities, and common use cases
---

# Frequently Asked Questions

## What is this?

Hyperclay is a platform for creating self-contained HTML applications that can modify and save themselves. Each app is a single HTML file that includes its own editing interface, data storage, and functionality. Think of it as Google Docs for web applications—you can view, edit, and share fully functional apps without any setup or deployment process.

## Why do I need it?

Traditional web development requires coordinating multiple systems: databases, backends, build tools, deployment pipelines. For many personal tools and small applications, this complexity is unnecessary overhead. Hyperclay eliminates this complexity by letting you build applications directly in HTML that persist their own state. You need Hyperclay when you want to build something quickly without thinking about infrastructure.

## Can I use React on it?

Yes, you can include React or any other JavaScript library directly in your HTML file. However, Hyperclay is designed to work without frameworks. The DOM itself becomes your component system through patterns like template-cloning. Many developers find they don't need React's complexity when the entire application fits in one file and the DOM naturally handles state.

```html
<!-- Using React (works but often unnecessary) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Hyperclay's approach (simpler for most cases) -->
<div task>
	<span contenteditable>Task content</span>
	<button onclick="this.closest('[task]').remove()">Delete</button>
</div>
```

## Why create something like this?

Modern web development has become increasingly complex. What started as simple HTML pages now requires extensive toolchains, multiple programming languages, and distributed systems knowledge. Hyperclay returns to the original vision of the web—a place where anyone can create and share interactive content. It's built on the belief that many applications don't need industrial-scale infrastructure; they need simplicity and directness.

## How long will this be around?

Hyperclay is designed for longevity. The core technology—HTML files that save themselves—will work as long as web browsers exist. Even if the Hyperclay service discontinued, your applications would continue to function. You can download your apps and host them anywhere, ensuring your work is never locked into our platform.

## What if the service shuts down?

Your applications are completely portable. Every Hyperclay app can be:
- Downloaded as a standalone HTML file
- Hosted on any static web server
- Run locally on your computer
- Modified to save to your own backend

The edit/save functionality requires one simple server endpoint, but the applications themselves are just HTML files that work anywhere.

## How do I update an app?

Updating an app in Hyperclay is as simple as:

1. **In-browser editing**: Navigate to your app and make changes directly, using the page's user interface
2. **Code editor**: Visit `/edit` on your app's URL for a full code editor
3. **DevTools**: Use browser Developer Tools to modify and test changes
4. **Local development**: Download, edit in your preferred editor, and re-upload

All changes are automatically versioned, so you can always restore previous versions if needed.

## How do I share data across pages?

Currently, each Hyperclay document is self-contained. For sharing data across multiple pages, you have several options:

**Current solutions:**
- Use URL parameters to pass data between pages
- Store shared data in localStorage (client-side only)
- Fetch data from external APIs or services
- Embed one Hyperclay app inside another using iframes

**Future capabilities** (on the roadmap):
- Native multi-page applications
- Shared data stores between documents
- Cross-document messaging system

## How do I handle user authentication?

Hyperclay handles document ownership (who can edit) but doesn't provide advanced user roles  within your apps. For user-specific features:

- Store user preferences in the DOM
- Create different documents for different user groups

## What are the performance limits?

Hyperclay apps perform well within these boundaries:

- **Document size**: Best under 1MB, works up to ~10MB
- **DOM elements**: Smooth up to ~100,000 elements
- **Save frequency**: No hard limit, but consider user experience
- **Concurrent users**: Unlimited viewers (it's just static HTML)

For larger applications, consider splitting into multiple documents or using lazy loading techniques.

## Can I use external APIs and services?

Yes! Hyperclay apps can fetch data from any CORS-enabled API:

```javascript
// Fetch weather data
const weather = await fetch('https://api.weather.com/...');

// Save to a backend service
await fetch('https://your-backend.com/save', {
	method: 'POST',
	body: JSON.stringify(data)
});

// Use function-as-a-service
const result = await fetch('https://api.val.town/v1/run/...');
```

## How do I monetize my Hyperclay apps?

Several monetization strategies work well:

- **Direct sales**: Sell your HTML file directly
- **Sponsored content**: Include affiliate links or ads
- **Premium features**: Gate advanced HTML Apps behind payment
- **Custom development**: Build bespoke apps for clients

Future platform features will include built-in payment processing.

## Is my code secure?

Hyperclay follows a transparency-first security model:

- All code is visible (view source)
- No server-side code execution
- Standard browser security policies apply
- Don't store sensitive data in the document
- Use external services for secure operations

This is similar to any client-side application—security through transparency rather than obscurity.

## Can I collaborate with others?

Currently, each document has one owner who can edit. For collaboration:

- Share read-only links for feedback
- Use version control (download/upload workflow)
- Clone documents for others to modify
- Future features will enable real-time collaboration

## What browsers are supported?

Hyperclay works in all modern browsers:
- Chrome/Edge (Chromium) 90+
- Firefox 90+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

Older browsers may work but aren't officially supported. The platform uses standard web technologies, ensuring broad compatibility.