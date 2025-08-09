---
title: Concepts
publish: true
description: Core concepts of Hyperclay including DOM as database, save lifecycle, view modes, and event handling fundamentals
---

# Core Concepts

Understanding these fundamental concepts will help you think in Hyperclay and build more effective HTML apps.

## DOM as Database

In traditional web apps, data lives in a separate database. In Hyperclay, the DOM itself is your database.

**Traditional approach:**
```javascript
// Data in JavaScript
let tasks = [{id: 1, text: "Buy milk", done: false}];

// Sync to DOM
function renderTasks() {
    tasksContainer.innerHTML = tasks.map(t => 
        `<div>${t.text}</div>`
    ).join('');
}
```

**Hyperclay approach:**
```html
<!-- Data lives directly in the DOM -->
<div class="task" data-done="false">Buy milk</div>
```

The DOM element is the single source of truth. No synchronization needed.

## Self-Modifying Documents

Hyperclay documents can modify and save themselves. This isn't just editing contentit's the document rewriting its own source code.

**How it works:**
1. User interacts with the page
2. JavaScript modifies the DOM
3. Save captures the entire DOM state
4. The modified HTML becomes the new document

**Example self-modification:**
```html
<button onclick="this.nearest.section.after(this.nearest.section.cloneNode(true));">Add Section</button>
```

When saved, the new section becomes part of the permanent document.

## View vs Edit Mode

Every Hyperclay document operates in two distinct modes:
### View Mode
- Default state for all visitors
- Interactive but read-only
- No editing controls visible
- Forms and buttons work normally
### Edit Mode
- Available only to document owners
- Editing controls appear
- Elements become modifiable
- Save functionality enabled

**Mode-specific elements:**
```html
<!-- Only visible in edit mode -->
<button option:editmode="true" trigger-save>Save Changes</button>

<!-- Editable only in edit mode -->
<h1 edit-mode-contenteditable>Page Title</h1>
```

## Save-Strip-Restore Cycle

The three-phase cycle that enables clean separation between editing and viewing:

### 1. Save Phase
When you trigger save:
- `onbeforesave` callbacks fire for cleanup
- Elements with `edit-mode-resource` are removed
- Attributes prefixed with `edit-mode-` are stripped
- The cleaned DOM is serialized to HTML

### 2. Strip Phase
The server stores the cleaned HTML:
- No editing interfaces remain
- No admin-only code exists
- Just the pure application

### 3. Restore Phase
When an editor loads the page:
- Edit permissions are detected
- `edit-mode-` attributes are re-enabled
- Hidden admin interfaces appear
- Save functionality activates

## Locality of Concern

Unlike traditional web development that separates HTML, CSS, and JavaScript into different files, Hyperclay embraces localitykeeping related code together.

**Everything in one place:**
```html
<div class="counter">
    <style>
        .counter { 
            border: 1px solid #ccc; 
            padding: 20px; 
            text-align: center; 
        }
    </style>
    <h3>Counter: <span>0</span></h3>
    <button onclick="this.previousElementSibling.querySelector('span').textContent++">
        Increment
    </button>
</div>
```

Structure, styling, and behavior unite in a single, understandable unit.

## Template-Clone Pattern

Create dynamic lists by cloning template elements rather than generating HTML strings.

**Template element (hidden):**
```html
<ul id="tasks">
	<!-- First child is the template -->
	<li class="task hidden" onclone="this.classList.remove('hidden')">
		<input type="checkbox" persist>
		<span contenteditable>New task</span>
		<button onclick="this.nearest.task.remove()">Delete</button>
	</li>
</ul>
```

**Add button:**
```html
<button onclick="this.nearest.task.after(this.nearest.task.cloneNode(true));">Add Task</button>
```

The template provides structure. Cloning creates instances. The DOM is the component system.

## Event Delegation

Since content can be added dynamically, use event delegation to handle events on future elements:

```html
<script>
// Attach to parent, not individual elements
document.addEventListener('click', e => {
	// Complete task
	if (e.target.matches('.task-complete')) {
		e.target.closest('.task').dataset.status = 'done';
	}
	
	// Delete task  
	if (e.target.matches('.task-delete')) {
		e.target.closest('.task').remove();
	}
});
</script>
```

New elements automatically inherit behavior based on their classes and position in the DOM.

## Don't be afraid to inline code

Hyperclay resurrects inline event handlers and styles as primary patterns:

**Inline events:**
```html
<button onclick="this.textContent = 'Clicked!'">Click me</button>
<input oninput="this.nextElementSibling.textContent = this.value">
<select onchange="document.body.className = this.value">
```

**Inline Tailwind classes:**
```html
<script edit-mode-resource="" src="https://hyperclay.com/js/vendor/tailwind-play.js"></script>
<div class="text-xl bg-slate-200 mb-8">Styled inline for immediate understanding</div>
```

When everything is visible at the point of use, there's no need to hunt through files to understand behavior.

## Progressive Enhancement

Start simple, add complexity only when needed:

```html
<!-- Level 1: Basic HTML -->
<h1>My App</h1>

<!-- Level 2: Make it editable -->
<h1 contenteditable>My App</h1>

<!-- Level 3: Only editable for owners -->
<h1 edit-mode-contenteditable>My App</h1>
```

Each attribute adds one specific capability. Build up functionality incrementally.

## Single File Philosophy

Everything lives in one HTML file:
- **Markup**: The structure
- **Styles**: The appearance  
- **Scripts**: The behavior
- **Data**: The state
- **Editor**: The development environment

When everything is in one place, you can understand the entire application at once. No hidden dependencies. No configuration files. No build process.

Your HTML file is simultaneously:
- The source code
- The deployed application
- The development environment
- The data storage