---
title: Get Started - Step-by-Step
publish: true
description: A step-by-step guide to building your first self-modifying HTML app with Hyperclay in minutes
---

# Get Started with Hyperclay

Build your first self-modifying HTML app in minutes. 

## What You'll Build

In this guide, you'll create a simple task list that:
- Saves automatically when you make changes
- Has different views for visitors and admins
- Persists data without any database setup
- Works as a single, portable HTML file

## 1. Create Your App

![[get-started-1.png]]
1. Go to [hyperclay.com](https://hyperclay.com)
2. Choose a name for your HTML App (e.g., "my-tasks")
3. Click "Create Site"

## 2. Add Your First HTML

![[get-started-2.png]]
1. Click "Edit Code" in your app's menu
2. Replace the default HTML with this starter template:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <link rel="stylesheet" href="https://hyperclay.com/css/tailwind-base.css">
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
    <script src="https://hyperclay.com/js/vendor/tailwind-play.js"></script>
  </head>
  <body class="font-sans max-w-2xl mx-auto mt-10 px-5">
    <h1 edit-mode-contenteditable class="text-3xl font-bold mb-6">Todo App</h1>
    <!-- Tasks -->
    <div tasks class="space-y-3">
      <!-- Hidden template for new tasks -->
      <div task onclone="this.classList.remove('hidden')" class="hidden p-4 bg-gray-100 rounded-lg flex items-center gap-3">
        <input type="checkbox" persist class="w-4 h-4">
        <span edit-mode-contenteditable class="flex-1">New Task</span>
        <button option:editmode="true" onclick="this.nearest.task.remove()" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
      <div task onclone="this.classList.remove('hidden')" class="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
        <input type="checkbox" persist class="w-4 h-4">
        <span edit-mode-contenteditable class="flex-1">Learn Hyperclay</span>
        <button option:editmode="true" onclick="this.nearest.task.remove()" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
    <!-- This only shows for admins -->
    <button option:editmode="true" onclick="this.nearest.tasks.append(this.nearest.task.cloneNode(true))" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Task</button>
  </body>
</html>
```

3. Click "Save" or press Cmd/Ctrl+S

## 3. Understanding the Magic

![[get-started-3.png]]

Let's break down what makes this Hyperclay app special:

### The Hyperclay Starter Kit
```html
<script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
```

This single line enables:
- **Auto-save**: Changes to the DOM are automatically saved
- **Edit/View modes**: Loads an admin-only view on top of the visitors' view
- **DOM persistence**: Form values and content changes can be easily preserved

### Key Attributes

**`option:editmode="true"`** - Shows elements only in edit mode:
```html
<div option:editmode="true">Only admins see this</div>
```

**`persist`** - Makes form values save to the DOM:
```html
<input type="checkbox" persist>
```

**`edit-mode-contenteditable`** - Makes text editable for admins only:
```html
<span edit-mode-contenteditable>Click to edit (admins only)</span>
```

### The Save Lifecycle

1. **You make a change** (check a box, edit text, add an element)
2. **Hyperclay detects the change** via mutation observers
3. **Before saving**, admin-only elements are stripped out
4. **The clean HTML is saved** to the server
5. **When loading**, admin elements are re-injected if you're the owner

## 4. Try Your Live App

![[get-started-4.png]]

1. Visit `https://your-app-name.hyperclay.com`
2. As the owner, you'll see:
   - Admin controls panel
   - Editable task text
   - Delete buttons
   - Everything saves automatically!
3. Try these actions:
   - Check some boxes - they stay checked after refresh
   - Click on task text to edit it inline
   - Add new tasks with the button
   - Toggle edit mode to see the visitor view
4. Open in an incognito window to see the clean, read-only visitor view

## 5. What's Next?

### Quick Experiments

Try adding these features to understand Hyperclay better:

**Element that cleans itself up before saving:**
```html
<div class="temp" onbeforesave="this.remove()">
  This element disappears on save
</div>
```

**Sortable tasks:**
```html
<div id="tasks" sortable="tasks">
  <!-- Tasks can now be dragged to reorder -->
</div>
```

### Key Concepts to Explore

- **DOM as Database**: Your HTML is your data storage
- **Self-Modifying Documents**: The page can change itself
- **Progressive Enhancement**: Start simple, add features as needed
- **Single File Philosophy**: Everything in one portable HTML file