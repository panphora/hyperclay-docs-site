---
title: 09. Under the Hood
publish: true
description: Technical deep dive into Hyperclay's architecture and how it enables self-modifying HTML documents
---

# Under the Hood

A technical overview of how Hyperclay enables self-modifying HTML documents.

## Architecture

Hyperclay's architecture is intentionally simple: HTML files that can save themselves through a minimal API.

### Core Components

**Client-side:**
- HTML document (the app itself)
- Hyperclay starter kit JavaScript
- Browser as the runtime environment

**Server-side:**
- Save endpoint for persisting changes
- Upload endpoint for file management
- Version storage system
- Authentication layer

### The Load-Modify-Persist Cycle

1. **Load**: Browser requests the HTML document
2. **Modify**: JavaScript changes the DOM based on user interactions
3. **Persist**: Save sends the modified DOM back to the server

This cycle is the foundation of every Hyperclay app.

## Data Flow

Understanding how data moves through a Hyperclay app helps you build better applications.

### Save Flow

When you trigger a save:

```javascript
// 1. Capture current DOM state
const html = document.documentElement.outerHTML;

// 2. Clean admin-only elements
cleanedHtml = handleEditModeElements(html);

// 3. Send to server
fetch(`/save/${siteName}`, {
    method: 'POST',
    body: cleanedHtml,
    headers: { 'Content-Type': 'text/html' }
});

// 4. Server writes to disk
// 5. Version backup created
```

### Load Flow

When a user visits your app:

```
1. Request: GET yourapp.hyperclay.com
2. Server: Reads current HTML file from disk
3. Response: Sends HTML with appropriate headers
4. Browser: Renders the document
5. JavaScript: Detects edit mode and restores editing UI
```

### Upload Flow

File uploads integrate seamlessly:

```javascript
// 1. User selects file
// 2. Upload to server
const formData = new FormData();
formData.append('file', selectedFile);

fetch('/upload', {
	method: 'POST',
	body: formData
});

// 3. Server stores file under your username
// 4. Returns URL
// 5. URL inserted into document
```

## Storage Layer

Hyperclay's storage is refreshingly simple compared to traditional web apps.

### HTML Document Storage

Each app is stored as a single HTML file:
```
/sites/
  yourapp.html      (current version)
  anotherapp.html   (current version)
```

### Version History

Every save creates a timestamped backup:
```
/sites-versions/
  yourapp/
    2024-01-15-10-30-45.html
    2024-01-15-14-22-10.html
    2024-01-16-09-15-33.html
```

This provides:
- Complete history of all changes
- One-click restore to any version
- Protection against accidental deletions
- No complex diff algorithms needed

### Upload Storage

User uploads are organized into folders, however you want to organize them:
```
/uploads/
  yourapp/
    images/
      logo.png
      banner.jpg
    documents/
      guide.pdf
```

## Security Model

Hyperclay's security model mirrors traditional website builders: trust each owner to manage their own page.

### Ownership Model

- **One owner per document**: The creator has full control
- **Server handles authentication**: Edit mode only available to authenticated owners

### Trust Boundaries

**What owners can do:**
- Add any HTML, CSS, or JavaScript
- Upload files within size limits
- Modify any part of their document
- Create public or private apps

**What owners cannot do:**
- Access other users' documents
- Exceed storage quotas
- Modify server behavior
- Access server file system

### Client-Side Security

Since all code is visible:
- Don't store secrets in the document
- Don't process sensitive data client-side
- Use external services for secure operations
- Treat all document content as public

### Content Security

**For app creators:**
- You have full control over your document
- Similar to Squarespace or Wix permissions
- Your code runs in visitors' browsers

**For app users:**
- View source to see all code
- Standard browser security applies
- No different from visiting any website

## Performance Considerations

### Document Size

As documents grow:
- Initial load time increases
- Save operations take longer
- Browser performance may degrade

**Best practices:**
- Keep documents under 1MB when possible
- Use external resources for large assets
- Paginate long lists
- Lazy load optional content

### DOM Complexity

Large DOM trees impact performance:
- Rendering slows with 10,000+ elements
- Interactions become sluggish
- Memory usage increases

**Optimization strategies:**
- Use virtual scrolling for long lists
- Remove unused elements
- Minimize DOM depth
- Batch DOM updates

### Save Optimization

Each save transmits the entire document:
- Network usage scales with document size
- Server processing time increases
- Version storage accumulates

**Mitigation approaches:**
- Save less frequently
- Compress large documents
- Archive old versions
- Use external storage for media

## Technical Limitations

Understanding the boundaries helps you design better apps.

### Browser Limitations

- Maximum string length for serialization
- Memory constraints for large DOMs
- Local storage quotas
- JavaScript execution limits

### Network Limitations

- Request size limits (typically 10-100MB)
- Timeout constraints
- Bandwidth considerations
- Latency effects on saves

### Platform Limitations

- File upload size (10MB default)
- Document count per user
- Version history depth
- Subdomain availability

These limitations are rarely hit in practice but inform architecture decisions for larger applications.