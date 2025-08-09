---
title: Advanced Topics
publish: true
description: Advanced techniques and patterns for building sophisticated multi-page, data-driven Hyperclay applications
---

# Advanced Topics

Techniques and patterns for building sophisticated Hyperclay applications.

## Multi-Page Applications

While each Hyperclay document is self-contained, you can create multi-page experiences.

### Navigation Between Documents

Create a consistent navigation structure across multiple HTML files:

```html
<!-- navigation.html -->
<nav id="global-nav">
	<a href="https://myhomepage.hyperclay.com">Home</a>
	<a href="https://myaboutpage.hyperclay.com">About</a>
	<a href="https://mycontactpage.hyperclay.com">Contact</a>
</nav>

<script>
// Highlight current page
const currentPath = window.location.pathname;
document.querySelectorAll('#global-nav a').forEach(link => {
	if (link.getAttribute('href') === currentPath) {
		link.classList.add('active');
	}
});
</script>
```

### Sharing State Across Pages

**Using URL parameters:**
```javascript
// Page 1: Set user preference
const params = new URLSearchParams();
params.set('theme', 'dark');
params.set('user', 'john');
window.location.href = `/page2.html?${params}`;

// Page 2: Read preference
const params = new URLSearchParams(window.location.search);
const theme = params.get('theme');
const user = params.get('user');
```

**Using localStorage:**
```javascript
// Shared state manager
const appState = {
	save(key, value) {
		localStorage.setItem(`myapp_${key}`, JSON.stringify(value));
	},
	load(key) {
		const data = localStorage.getItem(`myapp_${key}`);
		return data ? JSON.parse(data) : null;
	},
	clear(key) {
		localStorage.removeItem(`myapp_${key}`);
	}
};

// Usage across pages
appState.save('user', { name: 'John', role: 'admin' });
const user = appState.load('user');
```

### Creating a Site Map

Build an index page that links to all your documents:

```html
<div class="site-map">
	<h2>My Applications</h2>
	<div class="app-grid">
		<a href="/todo.html" class="app-card">
			<h3>Todo List</h3>
			<p>Manage daily tasks</p>
		</a>
		<a href="/notes.html" class="app-card">
			<h3>Notes</h3>
			<p>Quick note-taking</p>
		</a>
		<a href="/budget.html" class="app-card">
			<h3>Budget Tracker</h3>
			<p>Personal finance</p>
		</a>
	</div>
</div>
```

## Complex State Management

For applications with intricate state requirements, implement patterns that work with the DOM.

### State Machines in the DOM

Use attributes to track complex states:

```html
<div id="app" state="loading" user-role="guest" view="dashboard">
	<!-- Show loading -->
	<div option:state="loading">Loading...</div>
	
	<!-- Show error -->
	<div option:state="error">
		<p>Error: <span error-message></span></p>
		<button onclick="this.val.state = 'loading'; retryLoad()">Retry</button>
	</div>
	
	<!-- Show content -->
	<div option:state="ready">
		<div option:view="dashboard" option:user-role="admin">Admin Dashboard</div>
		<div option:view="dashboard" option:user-role="user">User Dashboard</div>
		<div option:view="settings">Settings Panel</div>
	</div>
</div>

<script>
// State transitions
function setState(newState, data = {}) {
	const app = document.getElementById('app');
	app.setAttribute('state', newState);
	
	// Update related attributes
	Object.entries(data).forEach(([key, value]) => {
		app.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
	});
}

// Usage
setState('ready', { userRole: 'admin', view: 'dashboard' });
setState('error', { errorMessage: 'Network timeout' });
</script>
```

### Computed Properties

Create reactive computed values using MutationObserver:

```html
<div id="calculator">
	<input type="number" name="price" value="100" persist>
	<input type="number" name="quantity" value="1" persist>
	<div>Total: $<span computed-total>100</span></div>
</div>

<script>
// Watch for changes and update computed values
const observer = new MutationObserver(() => {
	const calc = document.getElementById('calculator');
	const price = parseFloat(calc.querySelector('[name="price"]').value) || 0;
	const quantity = parseFloat(calc.querySelector('[name="quantity"]').value) || 0;
	calc.querySelector('[computed-total]').textContent = (price * quantity).toFixed(2);
});

observer.observe(document.getElementById('calculator'), {
	attributes: true,
	childList: true,
	subtree: true,
	attributeFilter: ['value']
});

// Trigger on input
document.querySelectorAll('#calculator input').forEach(input => {
	input.addEventListener('input', () => observer.takeRecords());
});
</script>
```

## Performance Optimization

Build responsive applications even with large amounts of data.

## Custom Edit Interfaces

Build sophisticated editing experiences tailored to your application.

### Visual Page Builder

Create a drag-and-drop interface for page construction:

```html
<div id="page-builder" option:editmode="true">
    <div class="toolbar">
        <button onclick="addComponent('heading')">Add Heading</button>
        <button onclick="addComponent('text')">Add Text</button>
        <button onclick="addComponent('image')">Add Image</button>
    </div>
    
    <div id="canvas" sortable>
        <!-- Components will be added here -->
    </div>
</div>

<script>
function addComponent(type) {
    const components = {
        heading: '<h2 edit-mode-contenteditable>New Heading</h2>',
        text: '<p edit-mode-contenteditable>New paragraph text...</p>',
        image: '<img edit-mode-resource src="/placeholder.jpg" alt="Click to upload">'
    };
    
    const wrapper = document.createElement('div');
    wrapper.className = 'component';
    wrapper.innerHTML = components[type];
    wrapper.innerHTML += '<button class="delete" onclick="this.parentElement.remove()">�</button>';
    
    document.getElementById('canvas').appendChild(wrapper);
}
</script>
```

### Inline Property Editor

Build contextual editing panels:

```html
<style>
.property-panel {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    display: none;
}
</style>

<div class="property-panel" id="prop-panel">
    <label>Background Color:
        <input type="color" onchange="currentElement.style.background = this.value">
    </label>
    <label>Padding:
        <input type="range" min="0" max="50" onchange="currentElement.style.padding = this.value + 'px'">
    </label>
    <label>Font Size:
        <input type="number" min="8" max="72" onchange="currentElement.style.fontSize = this.value + 'px'">
    </label>
</div>

<script>
let currentElement;

// Show property panel on element click in edit mode
document.addEventListener('click', (e) => {
    if (!window.editMode) return;
    
    const panel = document.getElementById('prop-panel');
    if (e.target.hasAttribute('editable-properties')) {
        currentElement = e.target;
        panel.style.display = 'block';
        panel.style.left = e.pageX + 'px';
        panel.style.top = e.pageY + 'px';
        
        // Load current values
        panel.querySelector('[type="color"]').value = 
            getComputedStyle(currentElement).backgroundColor;
    }
});
</script>
```

## Integration with External Services

Connect your Hyperclay apps to the broader web ecosystem.

### Webhooks and Automation

Trigger external services on save:

```javascript
document.addEventListener('beforesave', async () => {
    // Notify external service
    await fetch('https://hooks.zapier.com/hooks/catch/...', {
        method: 'POST',
        body: JSON.stringify({
            app: document.title,
            timestamp: new Date().toISOString(),
            stats: {
                elements: document.querySelectorAll('*').length,
                todos: document.querySelectorAll('[task]').length
            }
        })
    });
});
```

### Real-time Data Sync

Sync with external databases:

```javascript
// Periodic sync with external service
setInterval(async () => {
    if (!window.editMode) return;
    
    const tasks = Array.from(document.querySelectorAll('[task]')).map(el => ({
        id: el.getAttribute('task-id'),
        text: el.textContent,
        status: el.getAttribute('status')
    }));
    
    await fetch('https://api.yourservice.com/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks })
    });
}, 30000); // Every 30 seconds
```

### Embedding Third-Party Widgets

Integrate external tools seamlessly:

```html
<!-- Calendar widget -->
<div id="calendar-widget"></div>
<script src="https://cdn.calendly.com/widget.js"></script>
<script>
Calendly.initBadgeWidget({
    url: 'https://calendly.com/yourname',
    anchor: document.getElementById('calendar-widget')
});
</script>

<!-- Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_ID');
</script>
```

## Future-Proofing Your Apps

Build applications that will continue to work as Hyperclay evolves.

### Progressive Enhancement

Start simple and layer features:

```javascript
// Check for Hyperclay features
const features = {
	editMode: typeof window.editMode !== 'undefined',
	autoSave: typeof window.triggerSave === 'function',
	persistence: document.querySelector('[persist]') !== null
};

// Add features conditionally
if (features.editMode) {
  // Add edit mode UI
}

if (!features.autoSave) {
   // Provide manual save button
}
```
