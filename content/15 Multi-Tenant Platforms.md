---
title: Multi-Tenant Platforms
publish: true
description: Build SaaS platforms and multi-user applications with Hyperclay, enabling multiple users to have their own app instances
---

# Multi-Tenant Platforms with Hyperclay

Transform your Hyperclay app into a platform where multiple users can have their own instances. Perfect for SaaS tools, templates, and collaborative applications.

## Overview

Multi-tenant capabilities allow your Hyperclay app to become a platform where:
- Users can sign up and get their own instance
- Each instance maintains its own data and customizations
- You maintain a template that all instances are based on
- Users can customize their instance while receiving your updates

## Enabling Multi-Tenant Mode

Add the `enableSignups` attribute to your HTML element:

```html
<html lang="en" enableSignups>
```

This single attribute transforms your app from a single-user tool to a multi-tenant platform.

## How It Works

### 1. Template and Instances

When you enable signups:
- Your original site becomes the **template**
- Users who sign up get their own **instance** based on your template
- Each instance is a fork of your template at signup time
- Instances can be customized independently

### 2. User Registration Flow

```html
<!-- Add a signup form to your template -->
<div class="signup-section" option:editmode="false">
    <h2>Create Your Own Instance</h2>
    <form onsubmit="handleSignup(event)">
        <input type="text" name="sitename" placeholder="Choose your site name" required>
        <input type="email" name="email" placeholder="Your email" required>
        <button type="submit">Create My Site</button>
    </form>
</div>

<script>
async function handleSignup(event) {
    event.preventDefault();
    const data = getDataFromForm(event.target);
    
    // Submit to Hyperclay's signup endpoint
    const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        const result = await response.json();
        window.location.href = result.instanceUrl;
    }
}
</script>
```

### 3. Instance URLs

Each user's instance gets its own subdomain:
- Template: `https://yourapp.hyperclay.com`
- User Instance: `https://yourapp-username.hyperclay.com`

## Building Multi-Tenant Features

### 1. Template-Only Content

Content that should only appear on the template, not on instances:

```html
<!-- Signup call-to-action only on template -->
<div class="hero" option:isTemplate="true">
    <h1>Create Your Own Task Manager</h1>
    <p>Sign up to get your personalized instance</p>
</div>

<!-- Instance welcome message -->
<div class="hero" option:isInstance="true">
    <h1>Welcome to Your Task Manager</h1>
    <p>Start adding your tasks below</p>
</div>
```

### 2. Instance Customization

Allow users to customize their instance:

```html
<!-- Instance settings panel -->
<div class="settings" option:editmode="true" option:isInstance="true">
    <h3>Customize Your Instance</h3>
    <label>
        Site Title:
        <input type="text" value="My Tasks" 
               oninput="document.querySelector('h1').textContent = this.value"
               persist>
    </label>
    <label>
        Theme Color:
        <input type="color" value="#007bff"
               oninput="document.body.style.setProperty('--theme-color', this.value)"
               persist>
    </label>
</div>
```

### 3. Data Isolation

Each instance maintains its own data:

```html
<!-- Tasks are unique per instance -->
<div id="tasks" sortable="tasks">
    <div class="task">
        <input type="checkbox" persist>
        <span edit-mode-contenteditable>Instance-specific task</span>
    </div>
</div>
```

## Template Updates

### Pushing Updates to Instances

When you update the template, you can push changes to all instances:

```html
<!-- Version tracking -->
<meta name="template-version" content="1.2.0">

<!-- Update notification for instances -->
<div class="update-notice" option:isInstance="true" option:hasUpdate="true">
    <p>A new version is available!</p>
    <button onclick="applyTemplateUpdate()">Update Now</button>
</div>
```

### Selective Updates

Mark sections that should update vs. stay customized:

```html
<!-- This section updates with template -->
<nav data-sync="template">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
</nav>

<!-- This section remains customized -->
<div data-sync="instance">
    <h1 edit-mode-contenteditable>User's Custom Title</h1>
</div>
```

## Advanced Patterns

### 1. User Onboarding

Create an onboarding flow for new instances:

```html
<div class="onboarding" option:firstVisit="true">
    <h2>Welcome to your new instance!</h2>
    <button onclick="startTour()">Take a Tour</button>
    <button onclick="this.closest('.onboarding').remove()">Skip</button>
</div>

<script>
function startTour() {
    const steps = [
        { element: '.task', message: 'Add your tasks here' },
        { element: '.settings', message: 'Customize your instance' }
    ];
    // Tour implementation
}
</script>
```

### 2. Instance Analytics

Track usage across instances:

```html
<script>
// On template
if (hyperclay.isTemplate?.()) {
    // Show aggregate analytics
    fetch('/api/instances/stats')
        .then(r => r.json())
        .then(stats => {
            document.getElementById('totalInstances').textContent = stats.total;
            document.getElementById('activeUsers').textContent = stats.active;
        });
}

// On instances
if (hyperclay.isInstance?.()) {
    // Track instance activity
    Mutation.onAnyChange({ debounce: 5000 }, () => {
        fetch('/api/instance/activity', { method: 'POST' });
    });
}
</script>
```

### 3. Premium Features

Implement tier-based features:

```html
<!-- Premium feature gate -->
<div class="premium-feature" option:tier="premium">
    <h3>Advanced Analytics</h3>
    <!-- Premium content -->
</div>

<div class="upgrade-prompt" option:tier="free">
    <p>Upgrade to Premium for advanced features</p>
    <button onclick="window.location.href='/upgrade'">Upgrade Now</button>
</div>
```

## Best Practices

### 1. Design for Flexibility

```html
<!-- Use CSS variables for easy theming -->
<style>
:root {
    --primary-color: #007bff;
    --background: #ffffff;
    --text-color: #333333;
}

/* Allow instance customization */
body {
    background: var(--background);
    color: var(--text-color);
}
</style>
```

### 2. Clear Template vs Instance UI

```html
<!-- Template header -->
<header option:isTemplate="true">
    <h1>TaskManager Pro</h1>
    <nav>
        <a href="#features">Features</a>
        <a href="#signup">Get Started</a>
    </nav>
</header>

<!-- Instance header -->
<header option:isInstance="true">
    <h1 edit-mode-contenteditable>My Tasks</h1>
    <nav>
        <a href="#tasks">Tasks</a>
        <a href="#settings">Settings</a>
    </nav>
</header>
```

### 3. Data Portability

Allow users to export their data:

```html
<button onclick="exportInstanceData()">Export My Data</button>

<script>
function exportInstanceData() {
    const data = {
        tasks: Array.from(document.querySelectorAll('.task')).map(task => ({
            text: task.querySelector('span').textContent,
            completed: task.querySelector('input').checked
        })),
        settings: {
            title: document.querySelector('h1').textContent,
            theme: getComputedStyle(document.body).getPropertyValue('--theme-color')
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], 
                         { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-tasks-export.json';
    a.click();
}
</script>
```

## Common Use Cases

### 1. SaaS Landing Page Builder
- Template provides components and layouts
- Instances customize content and styling
- Built-in analytics and lead capture

### 2. Personal Dashboard Platform
- Template includes widgets and integrations
- Users arrange and configure their dashboard
- Data stays private to each instance

### 3. Documentation Sites
- Template provides structure and styling
- Teams customize content for their needs
- Updates to navigation flow to all instances

### 4. Form Builders
- Template has form components
- Users build custom forms
- Each instance collects its own submissions

## Security Considerations

1. **Data Isolation**: Each instance's data is completely separate
2. **Permission Model**: Only instance owners can edit their instance
3. **Template Protection**: Only template owner can modify the template
4. **Sandboxing**: JavaScript runs in the context of each instance

## Limitations

- Instances cannot communicate directly
- No built-in user authentication (instance URL is the auth)
- Template updates are manual (not automatic)
- No built-in payment processing

## Example: Complete Multi-Tenant Todo App

```html
<!DOCTYPE html>
<html lang="en" enableSignups>
<head>
    <meta charset="UTF-8">
    <title>TodoHub - Multi-Tenant Todo App</title>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
    <style>
        /* Shared styles */
        body { font-family: system-ui; margin: 0; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        
        /* Template styles */
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; padding: 60px 20px; text-align: center; }
        
        /* Instance styles */
        :root { --theme-color: #667eea; }
        .task { padding: 15px; margin: 10px 0; background: #f5f5f5; 
                border-left: 4px solid var(--theme-color); }
    </style>
</head>
<body>
    <!-- Template Homepage -->
    <div option:isTemplate="true">
        <div class="hero">
            <h1>TodoHub</h1>
            <p>Create your own private todo list in seconds</p>
            <button onclick="document.getElementById('signup').scrollIntoView()">
                Get Started Free
            </button>
        </div>
        
        <div class="container" id="signup">
            <h2>Create Your TodoHub</h2>
            <form action="/signup" method="POST">
                <input type="text" name="sitename" placeholder="your-name" required>
                <button type="submit">Create My TodoHub</button>
            </form>
        </div>
    </div>
    
    <!-- Instance App -->
    <div option:isInstance="true">
        <div class="container">
            <h1 edit-mode-contenteditable>My Todos</h1>
            
            <div option:editmode="true">
                <button onclick="addTodo()">Add Todo</button>
                <input type="color" value="#667eea" 
                       oninput="document.body.style.setProperty('--theme-color', this.value)"
                       persist>
            </div>
            
            <div id="todos" sortable="todos">
                <div class="task" style="display:none">
                    <input type="checkbox" persist>
                    <span edit-mode-contenteditable>New Todo</span>
                    <button option:editmode="true" 
                            onclick="this.closest('.task').remove()">×</button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function addTodo() {
            const template = document.querySelector('.task');
            const newTodo = template.cloneNode(true);
            newTodo.style.display = 'block';
            document.getElementById('todos').appendChild(newTodo);
        }
    </script>
</body>
</html>
```

Start building your multi-tenant platform with Hyperclay today!