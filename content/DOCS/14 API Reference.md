---
title: 14. API Reference
publish: true
description: Complete API reference for all Hyperclay attributes, methods, utilities, and custom DOM extensions
---

# Hyperclay API Reference

Complete reference for all Hyperclay attributes, methods, and utilities.

## Table of Contents

- [Custom Event Attributes](#custom-event-attributes)
- [Custom DOM Properties](#custom-dom-properties)
- [Custom DOM Methods](#custom-dom-methods)
- [Form & UI Attributes](#form--ui-attributes)
- [Admin-Only Attributes](#admin-only-attributes)
- [Visibility System](#visibility-system)
- [Hyperclay Object Methods](#hyperclay-object-methods)
- [UI Helper Functions](#ui-helper-functions)
- [Global Utilities](#global-utilities)
- [Special Attributes](#special-attributes)

## Custom Event Attributes

### `onrender`
Executes when the element is rendered (typically on page load).
```html
<div onrender="this.textContent = new Date().toLocaleDateString()"></div>
```

### `onbeforesave`
Executes before the page is saved. Commonly used to clean up admin UI.
```html
<div class="admin-toolbar" onbeforesave="this.remove()"></div>
```

### `onclickaway`
Executes when clicking outside the element.
```html
<div class="dropdown" onclickaway="this.classList.remove('open')"></div>
```

### `onpagemutation`
Executes when any DOM mutation occurs on the page.
```html
<div onpagemutation="console.log('Page changed')"></div>
```

### `onbeforesubmit`
Executes before form submission. Can return a Promise.
```html
<form onbeforesubmit="return validateForm(this)">
```

### `onresponse`
Executes after receiving a response. Receives `res` object.
```html
<form onresponse="handleResponse(res)">
```

### `onclone`
Executes when element is cloned. Useful for dynamic lists.
```html
<div class="template" onclone="this.id = 'item-' + Date.now()"></div>
```

## Custom DOM Properties

### `sortable`
Makes container sortable using sortable.js. Value is the group name.
```html
<ul sortable="tasks">
  <li>Task 1</li>
  <li>Task 2</li>
</ul>
```

### `sortable-handle`
Defines a drag handle within sortable items.
```html
<li>
  <span sortable-handle>⋮⋮</span>
  Task content
</li>
```

### `nearest`
Finds the nearest element matching a selector (class or attribute).
```javascript
// Find nearest element with class 'project'
this.nearest.project

// Find nearest element with attribute [data-id]
this.nearest.data_id
```

### `val`
Gets the attribute value from the nearest matching element.
```javascript
// Gets the value of [project-name] attribute from nearest element
let name = this.val.project_name
```

### `text`
Gets the innerText from the nearest matching element.
```javascript
// Gets text content of nearest element with class 'title'
let title = this.text.title
```

### `exec`
Executes code from the nearest matching element's attribute.
```javascript
// Executes code in [cleanup] attribute of nearest element
this.exec.cleanup
```

## Custom DOM Methods

### `cycle(order, attr)`
Replaces element with next/previous element of same type.
```javascript
// Cycle to next element with same [status] attribute
this.cycle('next', 'status')

// Cycle to previous
this.cycle('previous', 'status')
```

### `cycleAttr(order, attr)`
Cycles the value of an attribute instead of replacing the element.
```javascript
// Cycle the status attribute value
this.cycleAttr('next', 'status')
```

## Form & UI Attributes

### `persist`
Makes form input values persist to the DOM when changed (admin only).
```html
<input type="checkbox" persist>
<textarea persist></textarea>
```

### `prevent-enter`
Prevents form submission when Enter key is pressed.
```html
<textarea prevent-enter></textarea>
```

### `autosize`
Auto-resizes textarea based on content.
```html
<textarea autosize></textarea>
```

### `trigger-save`
Clicking element triggers page save.
```html
<button trigger-save>Save Changes</button>
```

## Admin-Only Attributes

### `edit-mode-input`
Input is disabled for non-admins.
```html
<input type="text" edit-mode-input>
```

### `edit-mode-resource`
Script or link tag is inert for non-admins.
```html
<script edit-mode-resource src="admin.js"></script>
```

### `edit-mode-contenteditable`
Element is editable only for admins.
```html
<h1 edit-mode-contenteditable>Page Title</h1>
```

### `edit-mode-onclick`
onclick only triggers for admins.
```html
<button onclick="deleteItem()" edit-mode-onclick>Delete</button>
```

### `save-ignore`
Element is removed before save and invisible to mutations.
```html
<div save-ignore>Temporary UI</div>
```

## Visibility System

### `option:` Attributes
Shows/hides elements based on ancestor attributes.
```html
<!-- Shows when inside element with editmode="true" -->
<div option:editmode="true">Admin Controls</div>

<!-- Shows when inside element with theme="dark" -->
<style option:theme="dark">
  body { background: #000; }
</style>
```

## Hyperclay Object Methods

### `hyperclay.beforeSave(doc)`
Called before save. Modify the document element passed in.
```javascript
hyperclay.beforeSave = function(doc) {
  doc.querySelectorAll('.temp').forEach(el => el.remove());
}
```

### `hyperclay.isEditMode()`
Returns true if in edit mode.
```javascript
if (hyperclay.isEditMode()) {
  // Show admin features
}
```

### `hyperclay.isOwner()`
Returns true if current user owns the site.
```javascript
if (hyperclay.isOwner()) {
  // Enable owner features
}
```

### `hyperclay.toggleEditMode()`
Toggle between view and edit modes.
```javascript
hyperclay.toggleEditMode();
```

### `hyperclay.uploadFile(eventOrFile)`
Uploads file with progress toast. Returns `{url, name}`.
```javascript
// From file input
async function handleUpload(event) {
  const result = await hyperclay.uploadFile(event);
  console.log('Uploaded:', result.url);
}

// From File object
const file = new File(['content'], 'test.txt');
const result = await hyperclay.uploadFile(file);
```

### `hyperclay.createFile(params)`
Creates and uploads a file.
```javascript
// From form event
hyperclay.createFile(event);

// From parameters
const result = await hyperclay.createFile({
  fileName: 'data.json',
  fileBody: JSON.stringify({test: 123})
});
```

### `hyperclay.uploadFileBasic(file, options)`
Basic upload without built-in UI.
```javascript
hyperclay.uploadFileBasic(file, {
  onProgress: (percent) => console.log(percent + '%'),
  onComplete: (result) => console.log('Done:', result),
  onError: (error) => console.error(error)
});
```

### `hyperclay.savePage(callback)`
Manually save the page.
```javascript
hyperclay.savePage(() => {
  console.log('Page saved!');
});
```

### `hyperclay.sendMessage(eventOrObj, successMessage, callback)`
Send message from visitor to admin.
```javascript
// From form
hyperclay.sendMessage(event, 'Message sent!');

// From object
hyperclay.sendMessage({
  name: 'John',
  email: 'john@example.com',
  message: 'Hello!'
}, 'Thanks for contacting us!');
```

## UI Helper Functions

### `ask(prompt, callback?, defaultValue?, extraContent?)`
Shows input dialog. Returns Promise.
```javascript
// With callback
ask('Enter your name:', (name) => {
  console.log('Hello', name);
});

// With Promise
const name = await ask('Enter your name:', null, 'Anonymous');

// With extra content
ask('Choose color:', null, '#000000', '<input type="color">');
```

### `consent(prompt, callback?, extraContent?)`
Shows yes/no dialog. Returns Promise.
```javascript
// With callback
consent('Delete this item?', () => {
  deleteItem();
});

// With Promise
if (await consent('Are you sure?')) {
  // Proceed
}
```

### `toast(message, type?)`
Shows temporary notification.
```javascript
toast('Changes saved!');
toast('Error occurred', 'error');
toast('Processing...', 'success');
```

### `info(message)`
Shows information dialog.
```javascript
info('This feature requires admin access.');
```

## Global Utilities

### `nearest(element, selector)`
Standalone version of element.nearest.
```javascript
const project = nearest(button, '.project');
```

### `slugify(text)`
Convert text to URL-friendly slug.
```javascript
slugify('Hello World!') // "hello-world"
```

### `h(emmetString)`
Create HTML using Emmet syntax.
```javascript
const elem = h('div.container>h1{Title}+p{Content}');
document.body.append(elem);
```

### `getTimeFromNow(date)`
Format date as relative time.
```javascript
getTimeFromNow(new Date('2024-01-01')) // "2 hours ago"
```

### `getDataFromForm(form)`
Serialize form to object.
```javascript
const data = getDataFromForm(document.querySelector('form'));
// {name: 'John', email: 'john@example.com'}
```

### `cookie` Object
Cookie management.
```javascript
// Set cookie
cookie.set('theme', 'dark');

// Get cookie
const theme = cookie.get('theme');

// Delete cookie
cookie.delete('theme');
```

### `query` Object
URL query parameter management.
```javascript
// Get parameter
const page = query.get('page');

// Set parameter
query.set('page', '2');

// Delete parameter
query.delete('page');
```

## Special Attributes

### `mutations-ignore`
Element and children are ignored by mutation observer.
```html
<div mutations-ignore>
  <!-- Changes here won't trigger saves -->
</div>
```

### `enableSignups`
Enable multi-tenant capabilities on the site.
```html
<html enableSignups>
```

## Mutation Observer

The `Mutation` object tracks DOM changes.
```javascript
// Listen for any DOM change
Mutation.onAnyChange({
  debounce: 200,
  omitChangeDetails: true
}, () => {
  console.log('DOM changed');
});
```