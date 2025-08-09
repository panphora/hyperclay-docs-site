---
title: 18. Tailwind CSS Integration
publish: true
description: Guide to using Tailwind CSS with Hyperclay via Play CDN for building beautiful, responsive interfaces without a build process
---

# Tailwind CSS Integration

Hyperclay includes built-in support for Tailwind CSS via the Play CDN, making it easy to build beautiful, responsive interfaces without any build process.

## Quick Start

Add these two lines to your HTML:

```html
<link rel="stylesheet" href="https://hyperclay.com/css/tailwind-base.css">
<script src="https://hyperclay.com/js/vendor/tailwind-play.js"></script>
```

That's it! You can now use Tailwind classes in your Hyperclay app.

## How It Works

### 1. Tailwind Base Styles
The `tailwind-base.css` file includes Tailwind's reset and base styles, providing a clean foundation without cluttering your DOM.

### 2. JIT Compilation
The `tailwind-play.js` script watches your DOM and compiles only the Tailwind classes you actually use, keeping your app fast and efficient.

### 3. Clean DOM Integration
Unlike the standard Play CDN, Hyperclay's version:
- Reuses the same `<style>` tag instead of creating new ones
- Keeps compiled styles separate from your content
- Works seamlessly with the save lifecycle

## Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind + Hyperclay</title>
    <link rel="stylesheet" href="https://hyperclay.com/css/tailwind-base.css">
    <script src="https://hyperclay.com/js/vendor/tailwind-play.js"></script>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-8" edit-mode-contenteditable>
            Welcome to Hyperclay + Tailwind
        </h1>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 class="text-xl font-semibold mb-2">Card Title</h2>
                <p class="text-gray-600">This is a responsive card using Tailwind classes.</p>
            </div>
        </div>
        
        <button class="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onclick="toast('Tailwind is working!')">
            Click Me
        </button>
    </div>
</body>
</html>
```

## Dynamic Styling with Hyperclay

### 1. Conditional Classes

Use Hyperclay's visibility system with Tailwind:

```html
<!-- Different styles for edit/view modes -->
<div class="p-4 rounded-lg"
     option:editmode="true" class="bg-blue-50 border-2 border-blue-200"
     option:editmode="false" class="bg-gray-50">
    Content adapts to mode
</div>

<!-- Mode-specific Tailwind classes -->
<style option:editmode="true">
    .editable { @apply ring-2 ring-blue-400; }
</style>
```

### 2. Dynamic Class Application

Change Tailwind classes with JavaScript:

```html
<div id="theme-demo" class="p-6 rounded-lg bg-white">
    <h3 class="text-lg font-semibold mb-4">Dynamic Theming</h3>
    
    <div class="space-x-2">
        <button onclick="setTheme('light')" 
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            Light
        </button>
        <button onclick="setTheme('dark')" 
                class="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700">
            Dark
        </button>
        <button onclick="setTheme('blue')" 
                class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
            Blue
        </button>
    </div>
</div>

<script>
function setTheme(theme) {
    const demo = document.getElementById('theme-demo');
    
    // Remove all theme classes
    demo.className = demo.className.replace(/bg-\w+-\d+/g, '');
    
    // Apply new theme
    switch(theme) {
        case 'dark':
            demo.classList.add('bg-gray-900', 'text-white');
            break;
        case 'blue':
            demo.classList.add('bg-blue-50', 'text-blue-900');
            break;
        default:
            demo.classList.add('bg-white', 'text-gray-900');
    }
    
    // Keep base classes
    demo.classList.add('p-6', 'rounded-lg', 'transition-colors');
}
</script>
```

### 3. Responsive Admin Controls

Show different layouts for admins:

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Regular content -->
    <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">Public Content</h2>
        <p class="text-gray-600">Visible to everyone</p>
    </div>
    
    <!-- Admin panel -->
    <div option:editmode="true" 
         class="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
        <h2 class="text-xl font-bold text-indigo-900 mb-4">Admin Panel</h2>
        <div class="space-y-3">
            <button class="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
                Add Content
            </button>
            <button class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Clear All
            </button>
        </div>
    </div>
</div>
```

## Building Components

### 1. Task List with Tailwind

```html
<div class="max-w-2xl mx-auto p-4">
    <div class="bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6" edit-mode-contenteditable>
            My Tasks
        </h1>
        
        <!-- Add task button -->
        <button option:editmode="true"
                onclick="addTask()"
                class="mb-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Task
        </button>
        
        <!-- Task list -->
        <div id="tasks" class="space-y-2" sortable="tasks">
            <!-- Task template -->
            <div class="task hidden flex items-center gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <div sortable-handle class="cursor-move text-gray-400 hover:text-gray-600" option:editmode="true">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </div>
                <input type="checkbox" persist class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500">
                <span class="flex-1 text-gray-700" edit-mode-contenteditable>New Task</span>
                <button option:editmode="true"
                        onclick="this.closest('.task').remove()"
                        class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<script>
function addTask() {
    const template = document.querySelector('.task');
    const newTask = template.cloneNode(true);
    newTask.classList.remove('hidden');
    document.getElementById('tasks').appendChild(newTask);
}
</script>
```

### 2. Settings Panel

```html
<div class="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform"
     id="settings-panel"
     class="translate-x-full"
     option:editmode="true">
    
    <div class="p-6 border-b">
        <h2 class="text-xl font-semibold">Settings</h2>
        <button onclick="toggleSettings()"
                class="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
    
    <div class="p-6 space-y-6">
        <!-- Color scheme -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Color Scheme
            </label>
            <div class="grid grid-cols-5 gap-2">
                <button onclick="setColorScheme('blue')"
                        class="w-12 h-12 bg-blue-500 rounded-lg hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"></button>
                <button onclick="setColorScheme('green')"
                        class="w-12 h-12 bg-green-500 rounded-lg hover:ring-2 hover:ring-green-500 hover:ring-offset-2"></button>
                <button onclick="setColorScheme('purple')"
                        class="w-12 h-12 bg-purple-500 rounded-lg hover:ring-2 hover:ring-purple-500 hover:ring-offset-2"></button>
                <button onclick="setColorScheme('red')"
                        class="w-12 h-12 bg-red-500 rounded-lg hover:ring-2 hover:ring-red-500 hover:ring-offset-2"></button>
                <button onclick="setColorScheme('gray')"
                        class="w-12 h-12 bg-gray-500 rounded-lg hover:ring-2 hover:ring-gray-500 hover:ring-offset-2"></button>
            </div>
        </div>
        
        <!-- Font size -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Font Size
            </label>
            <select onchange="setFontSize(this.value)"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="text-sm">Small</option>
                <option value="text-base" selected>Medium</option>
                <option value="text-lg">Large</option>
                <option value="text-xl">Extra Large</option>
            </select>
        </div>
    </div>
</div>

<script>
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('translate-x-full');
}

function setColorScheme(color) {
    // Implementation for color scheme
    document.body.className = document.body.className.replace(/bg-\w+-50/g, '');
    document.body.classList.add(`bg-${color}-50`);
}

function setFontSize(size) {
    document.body.className = document.body.className.replace(/text-\w+/g, '');
    document.body.classList.add(size);
}
</script>
```

## Advanced Patterns

### 1. Custom Tailwind Config

While using the Play CDN, you can still customize Tailwind:

```html
<script>
// Add custom colors and utilities before Tailwind loads
window.tailwindConfig = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    900: '#1e3a8a',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
            }
        }
    }
}
</script>
<script src="https://hyperclay.com/js/vendor/tailwind-play.js"></script>
```

### 2. Tailwind with Hyperclay Animations

Combine Tailwind transitions with Hyperclay events:

```html
<div class="notification hidden opacity-0 transform -translate-y-2 transition-all duration-300"
     onrender="setTimeout(() => this.classList.add('opacity-100', 'translate-y-0'), 100)">
    <div class="bg-green-50 border-l-4 border-green-400 p-4">
        <p class="text-green-700">Success! Your changes have been saved.</p>
    </div>
</div>

<script>
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 transform -translate-y-2 opacity-0 transition-all duration-300`;
    
    const colors = {
        success: 'bg-green-50 border-green-400 text-green-700',
        error: 'bg-red-50 border-red-400 text-red-700',
        info: 'bg-blue-50 border-blue-400 text-blue-700'
    };
    
    notification.innerHTML = `
        <div class="${colors[type]} border-l-4 p-4 rounded-md shadow-lg">
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.classList.remove('-translate-y-2', 'opacity-0');
        notification.classList.add('translate-y-0', 'opacity-100');
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('-translate-y-2', 'opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
</script>
```

### 3. Responsive Layouts

Build adaptive interfaces:

```html
<div class="min-h-screen bg-gray-100">
    <!-- Mobile menu button -->
    <button class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            onclick="toggleMobileMenu()">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    </button>
    
    <!-- Sidebar -->
    <aside id="sidebar" 
           class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-40">
        <nav class="p-6">
            <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
            <ul class="space-y-2">
                <li><a href="#" class="block py-2 px-4 rounded hover:bg-gray-100">Home</a></li>
                <li><a href="#" class="block py-2 px-4 rounded hover:bg-gray-100">Projects</a></li>
                <li><a href="#" class="block py-2 px-4 rounded hover:bg-gray-100">Settings</a></li>
            </ul>
        </nav>
    </aside>
    
    <!-- Main content -->
    <main class="lg:ml-64 p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <!-- Cards -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-2">Card Title</h3>
                <p class="text-gray-600">Responsive grid layout with Tailwind</p>
            </div>
        </div>
    </main>
</div>

<script>
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
}
</script>
```

## Performance Tips

### 1. Minimize Dynamic Classes

```html
<!-- Good: Define classes statically -->
<div class="bg-blue-500 hover:bg-blue-600">Button</div>

<!-- Avoid: Dynamic class construction -->
<div :class="`bg-${color}-500`">Button</div>
```

### 2. Use Tailwind's Built-in Optimizations

```html
<!-- Use Tailwind's space utilities instead of margins on each item -->
<div class="space-y-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>

<!-- Use divide utilities for borders -->
<div class="divide-y divide-gray-200">
    <div class="py-4">Section 1</div>
    <div class="py-4">Section 2</div>
</div>
```

### 3. Cleanup Unused Styles

```html
<script>
// Clean up dynamic styles before save
hyperclay.beforeSave = function(doc) {
    // Remove temporary Tailwind classes
    doc.querySelectorAll('[data-temp-classes]').forEach(el => {
        const tempClasses = el.dataset.tempClasses.split(' ');
        el.classList.remove(...tempClasses);
        delete el.dataset.tempClasses;
    });
};
</script>
```

## Common Patterns

### 1. Form Styling

```html
<form class="space-y-4">
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
            Name
        </label>
        <input type="text" 
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               persist>
    </div>
    
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
            Message
        </label>
        <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  persist></textarea>
    </div>
    
    <button type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
        Submit
    </button>
</form>
```

### 2. Card Components

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <img src="/api/placeholder/400/200" alt="Card image" class="w-full h-48 object-cover">
        <div class="p-6">
            <h3 class="text-xl font-semibold mb-2" edit-mode-contenteditable>Card Title</h3>
            <p class="text-gray-600 mb-4" edit-mode-contenteditable>Card description goes here...</p>
            <a href="#" class="text-blue-500 hover:text-blue-600 font-medium">Learn more →</a>
        </div>
    </article>
</div>
```

### 3. Navigation

```html
<nav class="bg-white shadow-sm">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <h1 class="text-xl font-bold" edit-mode-contenteditable>My App</h1>
            </div>
            
            <div class="hidden md:flex space-x-8">
                <a href="#" class="text-gray-700 hover:text-blue-500 transition-colors">Home</a>
                <a href="#" class="text-gray-700 hover:text-blue-500 transition-colors">About</a>
                <a href="#" class="text-gray-700 hover:text-blue-500 transition-colors">Contact</a>
            </div>
            
            <button class="md:hidden p-2 rounded-md hover:bg-gray-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </div>
</nav>
```

## Troubleshooting

### Classes Not Applying
- Ensure Tailwind scripts are loaded before using classes
- Check for typos in class names
- Verify classes aren't being removed by save lifecycle

### Style Conflicts
- Tailwind base styles might override custom styles
- Use Tailwind's important modifier: `!bg-blue-500`
- Or configure important in tailwind config

### Performance Issues
- Avoid generating hundreds of unique dynamic classes
- Use Tailwind's built-in variants instead of custom styles
- Consider purging unused styles in production

With Tailwind CSS and Hyperclay, you can build beautiful, responsive interfaces that save their state automatically - the best of both worlds!