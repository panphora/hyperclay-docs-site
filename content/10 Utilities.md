---
title: Utilities
publish: true
description: Powerful utilities and helper functions that make building Hyperclay HTML apps intuitive and efficient
---

# Utilities

Hyperclay provides powerful utilities that make building HTML apps intuitive and efficient.

## hyperclay-starter-kit.js

The starter kit is your Swiss Army knife for building Hyperclay apps. Include it with:

```html
<script src="https://hyperclay.com/js/hyperclay-starter-kit.js"></script>
```

### Core Features

- **Automatic save handling**: Detects changes and enables saving
- **Edit mode management**: Shows/hides editing UI based on permissions
- **Attribute processing**: Handles all special Hyperclay attributes
- **DOM enhancements**: Adds helpful methods to DOM elements

## Attributes

Special attributes that add superpowers to your HTML elements.

### `edit-mode-contenteditable`

Makes elements editable only when in edit mode.

```html
<h1 edit-mode-contenteditable>Click to edit this title</h1>
<p edit-mode-contenteditable>This paragraph is editable for owners only</p>
```

### `edit-mode-resource`

Marks elements that should only exist in edit mode. Removed before saving.

```html
<div edit-mode-resource>
	<button trigger-save>Save Changes</button>
	<button onclick="addNewSection()">Add Section</button>
</div>
```

### `persist`

Automatically saves form input values in the HTML.

```html
<input persist type="text" name="username" value="John">
<textarea persist name="notes">These notes persist between visits</textarea>
<select persist name="theme">
	<option>light</option>
	<option selected>dark</option>
</select>
```

### `sortable`

Makes child elements draggable for reordering.

```html
<ul sortable="items">
	<li>Drag me</li>
	<li>Reorder me</li>
	<li>Move me around</li>
</ul>
```

### `onrender`

Executes JavaScript when the element is added to the DOM.

```html
<div onrender="this.textContent = 'Rendered at: ' + new Date()">
  Loading...
</div>
```

### `onbeforesave`

Runs code before the document is saved. Useful for cleanup.

```html
<script onbeforesave="this.remove());"></script>
```

### `onclickaway`

Triggers when clicking outside the element.

```html
<div class="dropdown" onclickaway="this.classList.remove('open')">
	<button onclick="this.parentElement.classList.add('open')">Menu</button>
	<div class="dropdown-content">...</div>
</div>
```

### `onclone`

Executes when an element is cloned.

```html
<div class="item hidden" onclone="this.classList.remove('hidden')">
	<input type="text" placeholder="New item">
</div>
```

### `trigger-save`

Saves the document when clicked.

```html
<button trigger-save>Save Changes</button>
```

### `option:`

Shows/hides elements based on ancestor attribute values.

```html
<div theme="dark">
	<p option:theme="light">Light theme active</p>
	<p option:theme="dark">Dark theme active</p>
</div>
```

## DOM Properties

Enhanced properties added to all DOM elements.

### `nearest`

Finds the closest element with a specific attribute or class.

```html
<div task>
	<h3>Task Title</h3>
	<button onclick="this.nearest.task.remove()">Delete Task</button>
</div>
```

Can be chained with attribute names:
```javascript
this.nearest.task         // Finds nearest element with 'task' attribute
this.nearest.section      // Finds nearest element with 'section' attribute
this.nearest['data-id']   // Finds nearest element with 'data-id' attribute
```

### `val`

Gets or sets attribute values on the nearest matching element.

```html
<div status="pending">
    <button onclick="this.val.status = 'complete'">Mark Complete</button>
</div>
```

Reading values:
```javascript
const currentStatus = this.val.status;
const userId = this.val['user-id'];
```

### `text`

Gets or sets text content of the nearest matching element.

```html
<div>
	<span username>John Doe</span>
	<button onclick="this.text.username = 'Jane Doe'">Change Name</button>
</div>
```

### `exec`

Executes a method on the nearest matching element.

```html
<div task highlight="this.style.background = 'yellow';">
  <button onclick="this.nearest.task.exec.highlight()">Highlight</button>
</div>
```

## dollar.js ($)

A jQuery-like utility for selecting and manipulating elements.

### Basic Selection

```javascript
// Select all .item elements
$.item

// Select all [task] elements
$.task
```

### Array Methods

Dollar selections support array methods:

```javascript
// Get the last task
$.task.at(-1)

// Remove all completed tasks
$.task.filter(el => el.dataset.status === 'complete').forEach(el => el.remove())

// Count active tasks
$.task.filter(el => el.dataset.status === 'active').length
```

### Chaining

```javascript
// Remove the last task
$.task.at(-1).remove()

// Update all task statuses
$.task.forEach(el => el.dataset.status = 'pending')
```

### Usage in onclick

Perfect for inline event handlers:

```html
<button onclick="$.modal.at(0).style.display = 'block'">Show Modal</button>
<button onclick="$.task.at(-1).remove()">Remove Last Task</button>
<button onclick="$.notification.forEach(el => el.remove())">Clear All</button>
```

## UI Helpers

Interactive dialogs for user input.

### `ask()`

Prompts the user for text input.

```javascript
const name = await ask('What is your name?');
if (name) {
  document.getElementById('greeting').textContent = `Hello, ${name}!`;
}
```

### `consent()`

Shows a confirmation dialog.

```javascript
const doDelete = await consent('Are you sure you want to delete this?');
if (doDelete) {
  element.remove();
}
```

### `toast()`

Displays a temporary notification.

```javascript
toast('Changes saved successfully!');
toast('Error: Invalid input', 'error');
toast('Processing...', 'info');
```

## Event System

### `beforesave` Event

Fired before the document is saved.

```javascript
document.addEventListener('beforesave', (e) => {
	// Perform cleanup
	document.querySelectorAll('.temporary').forEach(el => el.remove());
});
```

## Hyperclay Best Practices

### 1. Use Semantic Attributes

```html
<!-- Good: Semantic attribute names -->
<div task status="pending" priority="high">

<!-- Less clear -->
<div data-type="task" data-s="p" data-p="1">
```

### 2. Leverage Nearest Navigation

```html
<!-- Good: Clear relationship -->
<button onclick="this.nearest.task.remove()">Delete</button>

<!-- Less maintainable -->
<button onclick="this.parentElement.parentElement.remove()">Delete</button>
```

### 3. Combine Utilities

```html
<!-- Sortable list with editable items -->
<ul sortable>
	<li class="task">
		<span edit-mode-contenteditable>Task 1</span>
		<button onclick="this.nearest.task.remove()">×</button>
	</li>
</ul>
```

### 4. Keep Inline Handlers Simple

```html
<!-- Good: Simple, clear action -->
<button onclick="this.val.count++">Increment</button>

<!-- Move complex logic to functions -->
<button onclick="handleComplexAction(this)">Process</button>
```

These utilities transform HTML from a static markup language into a dynamic application platform, all while maintaining the simplicity of a single file.