---
title: 01. Docs TLDR - Paste in LLM
publish: true
description: A comprehensive guide to building HTML apps on Hyperclay platform, designed to be pasted into LLMs for generating robust HTML applications
---

# Build HTML Apps on Hyperclay

Paste this page into your brain or an LLM to generate an up-to-date, robust HTML app you can host on Hyperclay.

We want to create a special kind of application that uses HTML as both the front end *and* the database. Whenever the page changes—or the user explicitly saves the page—we grab all the HTML, make a few modifications, and then POST it to the backend's "save" endpoint. 

The modification usually made before the page is saved is removing any admin controls. That way, when the page is reloaded by a non-logged-in user (an anonymous viewer), they'll only see a static, read-only page. 

When an admin loads that same page, they get the view-only page first, then any additional controls or editing features load in. 

That's the core idea of Hyperclay: a single HTML file that can toggle between view-only mode and edit mode, where changes made in the UI are persisted to the backend. 

**The Save Lifecycle**  
The "save lifecycle" is the heart of Hyperclay. Everything in the `hyperclay-starter-kit.js` (or the underlying file it references `hyperclay.js`) revolves around that concept. 

Here it is: the page changes, before saving we strip out admin-only elements, then we save the page. When you load the page, we re-inject the admin-only elements if you're an admin.

Hyperclay is perfect for building front-end–only apps: you don't need to worry about user accounts or a separate backend—just HTML, vanilla JS, and vanilla CSS in a single file that others can download, view, and even edit if they become the owner.

### The Hyperclay Starter Kit

There's a script called the Hyperclay Starter Kit (located at `/js/hyperclay-starter-kit.js`) that sets up the basics for your single-file HTML app:

1. **Automatic save** of the entire DOM when:
	1. The DOM changes (this includes changes made in the browser's DevTools)
	2. The user clicks a button with a `trigger-save` attribute
	3. The user presses the `CMD/Ctrl+s` save keyboard shortcut
2. **Visibility rules** for edit mode and view mode
	1. Hyperclay ships with a utility that automatically shows/hides elements with `option:` attributes based on whether any ancestor has a matching regular attribute (e.g., `<div option:editmode="true">` is shown inside `<div editmode="true">`)
	2. On page load, Hyperclay adds an `editmode` attribute to the `<html>` element, set to either `true` or `false`
	3. The `option:` system works with ANY attribute/value pair for dynamic visibility control (e.g., `<style option:theme="dark">` shows when inside `<div theme="dark">`)
3. **Support for custom event attributes** that make working with the DOM easier
	1. `onrender` — Evals its code when the element is rendered, usually on page load. Good for setting up the page before users interact with it.
	2. `onbeforesave` — Evals its code before the page is saved by `hyperclay.js`. Good for removing admin UI before saving the page, as the version of the page you want to save should always be in view-mode. e.g. `<div onbeforesave="this.remove()">`
	3. `onclickaway` — Evals its code when the user clicks somewhere that is not this current element.
	4. `onpagemutation` — Evals its code when any DOM mutation occurs anywhere on the page
	5. `onbeforesubmit` — Executes before form submission (can return a Promise)
	6. `onresponse` — Executes after receiving a response, receives `res` object
	7. `onclone` — Executes when element is cloned (useful for dynamic lists)
4. **Support for custom DOM properties**, accessible on every element
	1. `sortable` — Uses sortable.js to create a sortable container. All the elements inside of it can be dragged and reordered. The attribute value is the group name, so it can support dragging between two lists in the same group: `sortable="tasks"` allows dragging between multiple lists with the same group name.
	2. `sortable-handle` — Define a drag handle within sortable items (e.g., `<div sortable-handle>⋮⋮</div>`)
	3. `nearest` — This is a strange but incredibly useful attribute. It's used like this: `elem.nearest.some_selector`. It searches all nearby elements for an element with a custom attribute that matches `[some_selector]` or has the class `.some_selector`. It's useful because you don't have to think about if that element is a direct ancestor or sibling — you just ask it to get you the nearest one.
		1. Here's how I use this on panphora.com: `this.nearest('.project').before(this.nearest('.project').cloneNode(true))`, this finds the nearest `.project`, clones it (including its children), and inserts it before the original element—useful for duplicating a project block.
	4. `val` — This uses `nearest` under the hood, so it has a similar API: `elem.val.some_selector` but it goes one step further. After finding the element that matches `[some_selector]`, it returns the value of that attribute.
	5. `text` — This uses `nearest` under the hood, so it has a similar API: `elem.text.some_selector` but it goes one step further. After finding the element that matches `[some_selector]`, it returns the `innerText` of that element.
	6. `exec` — This uses `nearest` under the hood, so it has a similar API: `elem.exec.some_selector` but it goes one step further. After finding the element that matches `[some_selector]`, it evals the code in the value of that attribute.
5. **Support for custom DOM methods**, accessible on every element
	1. `cycle(order, attr)` — This is a strange and very useful attribute. It allows you to replace an element with the next or previous element of its same type, the type being specified by `attr`. In order to find the next unique element of the same type, it compares the `textContent` of each element.
	2. `cycleAttr(order, attr)` — This is similar to `cycle`, but instead of replacing the entire element, it just cycles the value of the attribute.
6. **Enable persistent form input values** by attaching a `persist` attribute to any input or textarea element
	- For example, if you check a checkbox and you're an admin, those changes persist to the DOM and thus the backend
7. **Additional form and UI attributes**
	1. `prevent-enter` — Prevents form submission when Enter key is pressed (useful for multi-line inputs)
	2. `autosize` — Auto-resizes textarea elements based on their content
8. **Admin-only attributes**
	1. Give any input or textarea the `edit-mode-input` attribute and they'll automatically get a `disabled` attribute for non-admins
	2. Give any `script` or CSS `link` tag an `edit-mode-resource` attribute and they'll be inert for non-admins (though still viewable in "View Source")
	3. Attach an `edit-mode-contenteditable` attribute to any element and it will be editable only for admins
	4. Attach an `edit-mode-onclick` attribute to any element with an `onclick` and the `onclick` will only trigger for admins
	5. Attach `save-ignore` attribute to any element to have it be removed from the DOM before saved and have DOM changes to it be invisible to hyperclay
9. One of the objects exported from the starter kit is `hyperclay`, which comes with some useful methods:
	1. `beforeSave` — Called before the page is saved, receives the document element (which you can modify) as its one argument, useful for stripping admin controls to maintain a "clean" initial version of the page
	2. `isEditMode()` — Returns boolean indicating if currently in edit mode
	3. `isOwner()` — Returns boolean indicating if current user owns the site
	4. `toggleEditMode()` — Toggle between view and edit modes
	5. `uploadFile(eventOrFile)`: Uploads a file from either a file input event or File object, showing progress toasts and copying the URL on completion
	6. `createFile(eventOrData | {fileName, fileBody})` — Creates and uploads a file from either a form event, data object, or direct parameters, with progress feedback. Returns `{url, name}` on success.
	7. `uploadFileBasic(eventOrFile, {onProgress?, onComplete?, onError?})` — Bare-bones file upload with customizable progress/completion/error callbacks instead of built-in toast notifications
	8. `savePage(callback?)` — Saves the current page HTML to the server if changes detected, takes optional callback that runs after successful save
	9. `sendMessage(eventOrObj, successMessage, successCallback?)` — Sends a message from an anonymous viewer to the admin of the page, only if they're likely to be human and not a bot. If passing in a submit `event`, all form fields will be sent. Otherwise, object will be converted to JSON and sent.
10. **Concise DOM manipulations** with dollar.js, a concise library to use in `onclick` attributes
	1. It combines array methods with DOM methods, so it's easy to operate on large swaths of the DOM at once
	2. Call `$.section` to get all elements with a class or attribute `section` and dump them in an array-like object that supports all DOM and array methods
	3. Some examples of what you can do:
		1. `$.panel.classList.toggle('active')` finds all elements with the class (or attribute) "panel" and toggles `.active`
		2. `$.project.filter(el => el.dataset.status === 'draft').remove()` removes all `.project` elements that have data-status="draft"
		3. `$.project.filter(el => el !== this && el.text.project_name === this.text.project_name).replaceWith(this.cloneNode(true))` replaces all `[project]` elements on the page with the current element
		4. `$('.items').filter(el => el.dataset.active)` — Filter elements by condition
		5. `$('.items').map(el => el.textContent)` — Map elements to array of values
		6. `$('ul').onclick('li', function() {...})` — Event delegation for dynamic content
		7. For more advanced examples, look at the source code for panphora.com
11. These UI helper methods are also exported by the starter kit
	1. `ask(promptText, yesCallback?, defaultValue?, extraContent?)` — Shows a modal dialog with text input, returns a Promise that resolves to input value, rejects if cancelled, callback runs on confirm
	2. `consent(promptText, yesCallback?, extraContent?)` — Shows a yes/no confirmation modal dialog, returns a Promise that resolves on confirm, rejects if cancelled, callback runs on confirm
	3. `toast(message, messageType?)` — Shows a temporary notification message with optional type ('success' or 'error'), auto-dismisses after 6.6s or on click
	4. `info(message)` — Shows an information dialog
12. Other useful DOM helpers
	1. `Mutation` is exported, which can track changes to the DOM. It's used to save the page whenever the DOM changes. To have it ignore an element (and its children), attach the attribute `mutations-ignore`. It has a wider API, but here's an example of how to use it: `Mutation.onAnyChange({debounce: 200, omitChangeDetails: true}, () => {})`
13. **Additional global utilities available**
	1. `nearest(element, '.selector')` — Find nearest matching element (standalone version)
	2. `slugify('Hello World!')` — Convert text to URL-friendly slug ("hello-world")
	3. `h('div.container>h1{Title}+p{Content}')` — Emmet-style HTML generation
	4. `getTimeFromNow(date)` — Format dates as relative time ("2 hours ago")
	5. `getDataFromForm(formElement)` — Serialize form data to object
	6. `cookie.set('key', 'value')` / `cookie.get('key')` — Cookie management
	7. `query.get('param')` / `query.set('param', 'value')` — Query parameter management

---
### Multi-tenant capabilities

Sites with `enableSignups` attribute can become multi-tenant platforms, allowing multiple users to have their own instances of your app.

---
### Tailwind support

It's very easy to add support for Tailwind by including the styles `/css/tailwind-base.css` and the script `/js/vendor/tailwind-play.js`. It's pretty much the same as the one from the [Tailwind play CDN](https://tailwindcss.com/docs/installation/play-cdn), except we make sure it uses the same `style` tag every time (instead of creating a new one) and we strip out some initial styles and put them in `tailwind-base.css` so they don't pollute the DOM.

---
### Apps with lists of items

When creating apps that have lists of items, you'll want to be able to create new items with default values. To stick with the best practice of using the DOM as the source of truth, it's strongly recommended to create an item at the start of the list set to `display: none` with all of the default values you want. Creating an item is then as simple as: `onclick="let card = $.card.at(0); card.classList.remove('hidden'); this.nearest.list.append(card.cloneNode(true)); toast('Card added');"`

---
### Apps with complex data

If you need to store data in an intermediary format like JSON (discouraged — try to keep things in the DOM), you can use a `<script type="application/json">` tag as a database you can read and write to. 

**Tip:** if you need to store HTML that includes `script` tags, escape the script tags so they don't prematurely end the `script` tag you're using as a database: `str.replaceAll("</script>", "[/SCRIPT]")` and then decode it when using it: `str.replaceAll("[/SCRIPT]", "</script>")`

Why doesn't Hyperclay just implement a simple key/value database? Because we'd like to maintain the ability for people to download a single, portable HTML file that works as a portable app on its own, with as few dependencies as possible.

---
### File upload and form submissions

Use `hyperclay.uploadFile` to for uploading files (only works if you're the page owner). Accepts multiple files or base64 data. Returns `{url, name}` on success.
Use  `hyperclay.sendMessage` to allow visitors to send the app admin a message (works for anonymous visitors). This will submit basic behavior data about the user to the server, which the server will use to confirm they're human.

---
### jQuery is cool again

jQuery is a great fit for Hyperclay. We recommend `dollar.js` instead because we made it. 
But jQuery is a great, battle-tested option.

---
### Tips

* Think of the DOM as a tree where nodes that are higher up in the tree are natural components. That means using `closest` and `nearest` a lot and setting state on parent elements in order to control the style and behavior of their children.
* When dynamically adding CSS, if you want to avoid flashes of unstyled content, add the new styles before removing the old ones.
* Use event delegation on `document` to handle all click/input/submit events, so when the DOM is mutated your event handlers keep working.

---
### Security

Worried about allowing people to run their own code on their own sites? It's the same security model as Wordpress/SquareSpace or any other website builder, which all allow you to include arbitrary HTML and JS. We trust the owner of each app to manage their own code and content and we report it to authorities and take it down if it's illegal or harmful to others.

---
### Wrap-Up

That's pretty much it. Hyperclay's mutation detector watches for page changes, triggers a save, and the code strips out the admin controls so the default view mode is clean. We rely on custom attributes (e.g. `onrender`, `onclickaway`, `onbeforesave`, `trigger-save`, `ignore-save`, `edit-mode-contenteditable`, `edit-mode-onclick`), built-in event attributes (`onclick`, `oninput`, etc.) and libraries (`hyperclay-starter-kit.js`, `dollar.js`) to build our app functionality in a single HTML file. 

You can add attributes like `onbeforesave="someCleanupFunction()"` or `edit-mode-onclick="doAdminThing()"` to seamlessly handle admin vs. viewer behavior.

It's a lightweight but powerful approach for building front-end-only, persistently malleable experiences that are portable, editable, shareable, and personal — perfect for apps generated by LLMs that take an afternoon of prototyping and iterating, when you don't want to spin up a full, traditional backend just to deploy something cool. 

1. Write a few lines of JS + HTML
2. Hyperclay handles persistence and access control
3. You get a great app with 0 time spend fiddling with web services