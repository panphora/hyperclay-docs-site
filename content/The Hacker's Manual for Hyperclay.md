---
title: The Hacker's Manual for Hyperclay
publish: true
description: A deep dive into the philosophy and technical approach of Hyperclay for developers who want to build without boundaries
---

## One Thing

Close your eyes and imagine holding a piece of clay. As you push and shape it, the clay responds. There's no gap between intention and creation—just you and the material.

Now open your eyes and look at modern web development. To build even the simplest application, your mind fragments across a constellation. Database schemas. API endpoints. State management. Build pipelines. Deployment. Authentication. Each layer demands attention, each abstraction pulls you further from working on the actual thing.

**Hyperclay offers something almost extinct in the digital realm: one thing to think about.**

![[transformation-of-control.jpg]]

One HTML document. That's it. As you shape it, you shape the actual application. 

* No persistence layer: the document persists itself
* No database: the DOM is the database
* No deployment pipeline: saving is deploying
* No build step: the document is already built

This simplicity feels wrong at first. What's the catch? 

That discomfort comes from being conditioned to use complex tools even for simple jobs. We've been taught that "real" software requires industrial-strength infrastructure. 

Personal tools — bicycles for the mind — don't require a full stack to create something that can transform how we think about and experience the world.

In fact, complex stacks tends to get in the way and distort the original vision.

## The Physical and The Digital

In the physical world, materials have inherent persistence. Shape clay, and it holds that shape. Write on paper, and your marks remain. This persistence requires no thought and no extra systems.

Digital creations don't have this natural persistence built in. Every change passes through multiple levels of complexity. Every state update needs validation, an ORM, a database, permission. 

We've accepted this complexity as the price of building software.

But we also have the concept of a malleable piece of software that behaves more like an object: a document.

What would an infinitely shapeable document look like?

## A New, Simpler Piece of Software: A Document That Shapes Itself

Hyperclay treats HTML documents as living, persistent entities. When you load an HTML file in Hyperclay, you receive HTML. When you interact with it, you modify the HTML. When you save, the HTML is synced and saved. 

The document contains everything:
- The interface you see (HTML)
- The styles that shape it (CSS)
- The behaviors it exhibits (JavaScript)
- The data it holds (DOM attributes and embedded JSON)
- The visual development environment used to edit it

**There are no hidden corners:** no server processes running in the background, just the application itself. It's all there in one file you can read and modify.

This transparency brings profound relief. Like looking at a mechanical watch through glass, you can see all the parts and how they work together. No unexplained side effects from hidden processes. Yet the simplicity itself feels magical.

## From Factory to Workshop

Modern web development was industrialized too soon. What began as simple HTML pages evolved into complex factories. Each application is an assembly line of specialized tools and systems. 

This serves large-scale systems well. It was built for them. Some applications do need to handle complex permissions, large-scale data, and real-time synchronization.

But we apply industrial-scale solutions to personal software too, simply because it's what developers are already familiar with. But a portfolio doesn't need microservices. A personal retirement planning tool doesn't need a build pipeline. A simple game-creator doesn't need Redux.

When you want to build something, you should be able to sit down and just build that thing.

1. Sit down at your workshop
2. Mold your material into your vision
3. (There is no third step)

Hyperclay helps get you back into the workshop. One craftsperson. One material. Direct manipulation instead of layered abstractions.

## The Google Docs of web apps

Over the past decade, I've spent an average of 3 years getting a big, monolithic, expertly-designed web application online.

Just when I think I've finished with the design, there's some edge case I didn't catch and I go down a rabbit hole designing 3 new pages.

Then some new library comes out that handles image cropping better, so I've got to update my front-end library and all its dependencies and wrestle with integrating the new cropping behavior.

It's the same pattern every time: exciting idea, rapid prototype, then years lost in coordinating infrastructure and disparate systems to achieve the original vision. 

By the time the app worked, the original spark had dimmed.

I wish there was a Google Docs for coders:

1. Open a "Self-Modifying Document" file
2. Modify not just the content of the document, but also the style, the logic, and the editing UI
	- Do this in native HTML/CSS/JS
3. Click "publish" to share it with anyone so they can read/edit/copy it

Just a raw HTML page (that you design yourself) with an editable UI (that you design yourself) so other people can use it (and make their own).

So I built it.

## Self-contained, portable, interactive, malleable documents

Hyperclay creates a new type of software artifact: self-contained HTML documents that carry their own editing interface. Like a Google Doc, anyone can view it. Those with permission can edit it. 

But unlike a Google doc, it's a fully functional application — it can display and modify files, process large amounts of data, and display data in interesting ways.

Each HTML app:
- **Ships with its editing UI built-in**: No separate admin panel. The document includes its own visual development environment. (The developer builds this themselves or uses Hyperclay's helper attributes like `edit-mode-contenteditable` and `persist`)
- **Unlimited cloning**: Anyone can copy and modify for their own purpose, and they get the original editing UI built-in.
- **Scales effortlessly**: Static HTML (which is all it is) can serves millions of visitors without breaking a sweat.
- **Persists naturally**: Changes save back to the same file. The document is the database.

It's like a Google Doc—easy to view/access/edit/clone—but with your own custom UI. **The HTML document is simultaneously the source code, the runtime, the database, and the deployed application.** 

There's no compilation step because there's nothing to compile. There's no deployment because saving is deployment. There's no database because the DOM is the database.

## Where Hyperclay Shines

Let's be clear about what Hyperclay is: a specialized tool that excels at specific types of applications. It's not a replacement for modern web frameworks.

But, for the right use cases, it's superior.

It's perfect for:
- **Local-first applications**: Applications that manipulate files without requiring network access
- **Personal tools and utilities**: Software tailored to how you think and work
- **Interactive documents**: Content that benefits from being both readable and interactive
- **Prototypes and experiments**: Quick ideas that need to be functioning immediately
- **Internal team tools**: Tools where everyone gets their own version to modify

Some examples:
* Media editors (audio, visual, video)
* Journals and Blogs
* Financial calculators
* Educational materials
* Data visualizers
* Interactive reports
* Project trackers
* Dashboards

Modern browsers are incredibly powerful. With Web APIs for audio, video, canvas, WebGL, and file system access, you can build full applications entirely in the front-end. 

Think about desktop software you use daily—much of it doesn't need a server. Hyperclay brings that same model to the web: self-contained applications that just work.

**Trade-offs to consider:**
- All state must be contained in the DOM or in memory
- All code is visible to users
- Limited to what browsers can do (which is quite a lot these days)
- Single-file architecture may feel constraining for very large applications

The key insight is that not every application needs industrial-scale infrastructure. Sometimes you just need a single document-like application that just works.

## The Load-Modify-Persist Cycle

The technical primitive is elegant:

1. **Load**: When a user visits a Hyperclay URL, the server delivers the current state of that HTML file
2. **Modify**: JavaScript responding to user interactions modifies the DOM—adding elements, changing attributes, updating text
3. **Persist**: For users with edit permissions, saving triggers the cycle:
   - Serialize the current DOM state
   - Remove admin-only UI elements
   - Send the cleaned HTML to the server
   - Server writes this as the new state

This creates a tight feedback loop. Changes you make to the DOM immediately affect the application's behavior. Saving persists those changes for all future visitors. **The document modifies itself, stores itself, and serves itself.**

## Edit Mode vs View Mode

Every Hyperclay document operates in two modes:

**View mode**: The default experience. The document renders as a functional application. Forms work, buttons click, interfaces respond—but the underlying document cannot change.

**Edit mode**: Available to document owners. The same file gains superpowers:

```html
<!-- Visible only in edit mode -->
<div option:editmode="true">
  <button onclick="addNewSection()">Add Section</button>
</div>

<!-- Editable only for editors -->
<h1 edit-mode-contenteditable>Welcome to My App</h1>
```


## The save-strip-restore cycle

The technical challenge of self-editing documents is preventing admin interfaces from leaking to public users. Hyperclay solves this through a three-phase cycle:

**Save phase**: When an editor triggers save, Hyperclay's JavaScript:
1. Fires `onbeforesave` callbacks for cleanup
2. Removes all elements marked with `edit-mode-resource`
3. Strips all attributes with matching `edit-mode-` prefixes
4. Serializes the cleaned DOM as HTML
5. Sends this HTML to the server

**Serve phase**: The server stores this cleaned HTML. When visitors request the page, they receive this public version—no admin code, no edit interfaces, just the application.

**Restore phase**: When an editor loads the page, Hyperclay's JavaScript:
1. Detects edit permissions from the server
2. Re-enables `edit-mode-` attributes
3. Shows hidden admin interfaces
4. Loads admin-only resources
5. Shows elements with `option:editmode="true"`
6. Activates save functionality

The actual save mechanism is beautifully simple: when you save, Hyperclay serializes the entire DOM (`document.documentElement.outerHTML`) into an HTML string and POSTs it to the server (`/save/${siteName}`). The server receives this HTML and writes it to disk.

This cycle ensures that **the same file serves different experiences without maintaining separate versions.** Each user sees only what they should see.


## Thinking in Hyperclay

### Supporting the traditional stack: scripts as embedded databases

Complex data that doesn't naturally map to DOM attributes lives in script tags:

```html
<script id="app-data" type="application/json">
{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"}
  ],
  "settings": {
    "theme": "dark",
    "notifications": true
  }
}
</script>

<script>
function getData() {
  return JSON.parse(document.getElementById('app-data').textContent);
}

function saveData(data) {
  document.getElementById('app-data').textContent = JSON.stringify(data, null, 2);
}
</script>
```

The script tag persists with the document. Changes to this embedded data save with everything else. **The document is its own database.**

### DOM as the State Machine

But if you really want the full benefits of an HTML app, you need to learn to think of the DOM as more than just a view layer.

Traditional web apps carefully separate concerns. HTML provides structure, CSS provides styling, JavaScript provides behavior, and databases store data. This separation requires translation layers between each system.

Hyperclay inverts this. The DOM isn't just a view layer—it's the entire state machine. 

Elements store data in attributes. Hierarchy provides natural namespacing. The tree structure itself encodes the relationship between different pieces of data.

The nice thing about state merging with the DOM: a single attribute on an element can control the styling, dependent state, and behavior of everything it encapsulates. 

```html
<div class="[&[status=complete]]:border-green-500 [&[status=complete]]:bg-green-50 [&[status=pending]]:border-slate-200 m-8 rounded-lg border-2 bg-white p-6 shadow-sm" status="pending">
 <h3 class="text-lg font-semibold text-slate-900 mb-2">Task Item</h3>
 
 <p class="text-slate-600 mb-4">This is a task that can be marked as complete.</p>
 
 <div class="mb-4">
   <span option:status="complete" class="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">✓ Complete</span>
   <span option:status="pending" class="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">⏳ Pending</span>
 </div>
 
 <button 
   option:status="pending"
   onclick="this.parentElement.setAttribute('status', 'complete')"
   class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
 >
   Mark Complete
 </button>
</div>
```

The task's existence, properties, and behavior unite in a single element. Querying tasks means querying the DOM. Updating means modifying attributes. Deleting means removing elements. The representation is the reality.

### Everything is exactly where it is

Want to know what a button does? Right click and Inspect Element. Want to change what it does? Change it in DevTools and save. The browser becomes your IDE. There's no hidden configuration, no remote API endpoint, no separate controller file. The behavior is right there in the HTML where you can see it, understand it, and modify it.

### Locality of concern over separation of concerns

Modern web development prizes separation of concerns. HTML goes in `.html` files, CSS in `.css` files, JavaScript in `.js` files. Components live in `/components`, utilities in `/utils`, routes in `/routes`. This separation promises maintainability through organization.

But separation has a cost. **To understand a single button's behavior, developers must trace through multiple files—the HTML for structure, the CSS for appearance, the JavaScript for behavior, the component definition for props, the event handler for logic, the API endpoint for effects.** The mental model of a single button fragments across the codebase.

Hyperclay embraces locality of concern. Related elements cluster together:

```html
<div class="border border-gray-400 p-2 space-x-2">
  <button onclick="this.nextElementSibling.textContent--">-</button>
  <span>0</span>
  <button onclick="this.previousElementSibling.textContent++">+</button>
</div>
```

The counter's structure, style, and behavior unite in a few lines. No imports, no references, no indirection. **Everything you need to understand lives in one place.**

This extends to application-level organization. Instead of scattering related functionality across a file tree, HTML apps grow organically with the document. Features accrete as DOM subtrees, providing organic code organization.

### Inline events and the return of onclick

Modern frameworks condemn inline event handlers as archaic, insecure, and unmaintainable. Hyperclay resurrects them as a core pattern:

```html
<button onclick="this.closest('.post').remove()">Delete</button>
<input oninput="this.nextElementSibling.textContent = this.value.length">
<select onchange="document.body.dataset.theme = this.value">
```

This isn't regression—it's recognition that **for many interactions, the handler is the documentation.** The button that deletes its parent needs no separate function named `handleDeleteClick`. The behavior explains itself at the point of use.

Hyperclay extends this pattern with powerful navigation utilities:

```html
<button onclick="this.nearest.task.remove()">Delete Task</button>
<input oninput="$.counter.dataset.value = this.value">
<div onclick="this.nearest.note.exec.customHandler()">Run Handler</div>
```

The `nearest`, `val`, `text`, and `exec` helpers provide jQuery-like traversal with semantic precision. The Dollar.js library (`$`) provides easy access to the DOM through object and array methods. Methods read like natural language; instead of `this.closest('[data-name]').setAttribute('data-name', 'David')`, developers write `this.val.name = 'David'`. Event handlers become concise, expressive, and locally comprehensible.

### Progressive enhancement through custom DOM attributes and methods

Hyperclay's attribute system enables incremental complexity. Simple apps need only basic HTML. As requirements grow, developers add attributes to enable new capabilities:

**`edit-mode-contenteditable`** - Makes any element editable only when in edit mode:
```html
<h1 edit-mode-contenteditable>Click to edit this title when logged in</h1>
```

**`persist`** - Saves form input values directly in the HTML file:
```html
<input persist name="username" placeholder="This value persists between visits">
```

**`sortable`** - Makes child elements draggable to reorder:
```html
<ul sortable>
  <li>Drag me</li>
  <li>And me</li>
</ul>
```

**`.nearest`** - Finds the nearest element with a specific attribute:
```html
<button onclick="this.nearest.task.remove()">Delete Task</button>
```

**`.val`** - Gets or sets attribute values on nearest matching element:
```html
<button onclick="this.val.status = 'complete'">Mark Complete</button>
```

**`onclone`** - Runs code when an element is cloned:
```html
<li class="hidden" onclone="this.classList.remove('hidden')">Template</li>
```

**`$`** - jQuery-like selector for finding and manipulating elements:
```html
<button onclick="$.task.at(-1).remove()">Delete Last Task</button>
```

**`option:`** - Shows/hides elements based on attribute values:
```html
<div option:theme="dark">Only visible when theme="dark"</div>
```

**`trigger-save`** - Saves the current state of the HTML document:
```html
<button trigger-save option:editmode="true">Save Changes</button>
```

Each attribute adds one specific capability. There's no framework to learn, no API to memorize, you can implement the same functionality with jQuery or vanilla JS. **Developers can start with DOM methods they already know and add functionality through simple, declarative attributes.**

### The template-clone pattern

Creating dynamic lists presents a fundamental challenge—how do you define the structure of new items? Traditional approaches use JavaScript string templates or framework components. These will work fine, but Hyperclay encourages using the DOM itself:

```html
<ul class="tasks">
  <!-- First child serves as template -->
  <li class="task hidden" onclone="this.classList.remove('hidden')">
    <input type="checkbox">
    <span contenteditable>New task</span>
    <button onclick="this.closest('.task').remove()">×</button>
  </li>
</ul>
<button 
  onclick="this.nearest.task.before(this.nearest.task.cloneNode(true));"
>Add Task</button>
```

The first child serves as a template, hidden but functional. Adding items means cloning this template. **The DOM provides its own component system.**

### Event delegation for dynamic content

Since content can be added dynamically, event handlers must work for future elements, so we need to use event delegation everywhere:

```html
<script>
// Attach to document, not specific elements
document.addEventListener('click', e => {
  // Handle task completion
  if (e.target.closest('.task-complete')) {
    e.target.closest('.task').dataset.status = 'done';
  }
  
  // Handle task deletion
  if (e.target.closest('.task-delete')) {
    e.target.closest('.task').remove();
  }
});
</script>
```

Event delegation ensures that dynamically added elements automatically gain the behavior implied by their position in the DOM.


## The Philosophy of Hyperclay

### Complexity is everywhere and it serves a purpose

When Gmail launched in 2004, everything changed. Suddenly the web felt alive. Click a button, the page responds instantly. No refresh. Pure magic.

The rush was intoxicating. Everyone wanted that Gmail feeling. Frameworks exploded everywhere—Angular, React, Vue, Svelte. Each one promising to make the magic easier. And they delivered. Web apps started feeling better than desktop apps. Smoother. Faster. More connected.

But then something weird happened. We started using these massive frameworks for everything. Need a contact form? Better set up webpack. Want to show your portfolio? Time for a build pipeline. Building a retirement calculator for yourself? Obviously you need Redux.

It's like we collectively forgot that a simple HTML page with a bit of JavaScript already works. We were so impressed with our new industrial equipment that we started using it to make a sandwich.

The frameworks aren't the problem. They're incredible tools solving incredible problems. Facebook needs React. Netflix needs microservices. But somewhere we got confused and thought every piece of software needed to be built with industrial-scale tools.

(Most frameworks reduce complexity by adding abstractions. Hyperclay reduces it by removing them.)

### Some things shouldn't be complex: making the web malleable

Here's what kills me: the web was supposed to be different. 

> "The Web was designed as an interactive space where everyone can edit." — Tim Berners-Lee

The original vision had everyone as both consumer and creator. But somehow we ended up with a read-only web where deploying anything real requires a degree in rocket science and a DevOps team.

I spent years building things the "right" way. Using the latest framework. Configuring packages, state management libraries, routes, authentication. Managing deployments. And for what? So I could make a UI other people could use?

The whole dream of the web was distributed access. What was the point of that if all you could do was look and not touch?

The frustration ate at me.

This obsession drove everything—starting a company, building Remake, pivoting to Hyperclay. Twelve years chasing one simple idea: what if the web was malleable by default? What if the file you're viewing could also be the file you're editing?

All it would take is letting files modify themselves. That's it.

### Software as digital objects

I'm obsessed with making software feel natural. But here's the problem: digital things don't behave like real things.

In the physical world, everything just works. Pick up a book, it stays picked up. Write on paper, the words stay written. Shape clay, it holds its shape. No configuration or persistence system required. Materials have inherent properties—weight, texture, persistence—that make them feel real.

Software breaks all these rules. Save a file, where is it? Type into a text box and come back later, it forgets what you typed. Create something, but you can't hold it, take it, or hand it to someone else. We've built a parallel universe where nothing behaves the way that's intuitive to us.

The solution isn't more features or better interfaces. It's rethinking software as objects.

What if digital objects behaved more like physical ones? What if an HTML document had unity and uniformity, making it feel like one, distinct thing? What if it had location—it stays where you put it and you can move it? What if it had persistence—changes stuck without some big dance?

This is what Hyperclay is really about. Not just simpler web development, but software that behaves like objects. You shape it, it stays shaped. You move it, it stays moved. You give it to someone, they actually receive it.

The UI is the app. There's no backend to crash, no API to timeout, no database to corrupt. What you see is literally all there is. And that's not a limitation—it's power.

Software should feel real. As malleable, persistent, and portable as clay.

### Common Questions

**"Why not just use localStorage?"**

localStorage only saves changes on your own machine. If you want to share your creation with others, they won't see your changes. You need a server to persist and sync those changes across visitors.

Hyperclay handles that automatically. When you save, everyone sees the same updated page. It's the difference between a personal notebook and a shared document.

**"Why not just build a small React app?"**

Even the simplest React app means: installing Node, managing dependencies, configuring webpack, setting up routing, deploying to Vercel. Before you write a single line of your actual app, you're deep in tooling.

Hyperclay is one HTML file. Open it, edit it, save it. No build step. No deployment pipeline. The simplicity isn't just nice—it fundamentally changes how you think about building things. When the barrier to starting is zero, you start more things.

### Starting from scratch

Begin with a simple HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
</head>
<body>
    <h1 edit-mode-contenteditable>My App</h1>
</body>
</html>
```

Copy this into the Hyperclay editor. You now have a live application. The title is editable when you're logged in. That's it. **You've deployed your first HTML app.**

## The Personal Software Wave

In the age of LLMs, people want to customize their UIs to fit their exact needs. Hyperclay provides a local, malleable, portable, single-file approach to software that can be run anywhere and is easy to edit alongside an LLM. You can deploy 1,000 HTML apps in the time it would take you to ship a few standard full-stack web apps. And the noise in your head from all the dependencies is less—it's just one flat DOM layer instead of dozens of uncorrelated systems.

The future is people collaborating with LLMs to build software that fits how they think and work. HTML apps make this collaboration frictionless.

### Build your own UI with LLMs

You can now program computers by describing what you want in plain English. People are already using LLMs to build full web applications in hours.

The problem with using LLMs to build applications is: they get distracted, just like people.

I was building a cake-assembling game with an LLM the other day, and no matter what I tried the LLM kept outputting really poorly-drawn cakes. It wasn't until I had it focus 100% on drawing a good cake that I was actually able to make progress.

The advantage of using Hyperclay is the LLM can stay focused on solving the core problem you want to solve (building the UI) instead of getting caught up in implementation details. Just HTML and some jQuery to modify the page when buttons are pressed—that's the entire application. No routes, no controllers, no models. The LLM can understand the whole thing in a single context window.

### Layer on your own editable UI

Once you have a UI you love, make it editable in a way you love! There's a million ways to edit things — popups, popovers, inline, forms. Everyone has a preference.

When you make a UI with Hyperclay, you own the entire experience, front to back. You can determine when someone can edit something and how it's done.

So much of the web is frozen in this respect, because editing interfaces need to work for *everyone*. So every app implements the exact same boring form components. 

But when it's a document you own, top to bottom, you can embed your philosophy of how the world works into the editable UI.

### Share apps globally

Want to host your app where you can edit it? Use Hyperclay.com

Want to host it so anyone can view it? Use any static web host

### Use apps locally

Want to use your app as local software? Use Hyperclay Local, a free server that runs on your local machine and lets you play around with HTML apps as if they're desktop apps!

### Allow anyone to build on top of your innovation

In HTML apps, everything is contained in the hypertext markup, so when someone downloads it, they get your full application.

This means the editable financial calculator you use for your freelance illustration business can be repurposed by an accountant who wants their clients to plan for their retirements.

When web applications have open code, we can build on each other and watch ideas evolve quickly. A UI you built and thought was state-of-the-art last week might be replaced by something even cooler next week that you can then borrow for your own future projects.

Think about it: 20-30% of all web applications ever built could have started as self-modifying HTML files. Every calculator, every formatter, every graphing tool, every personal organizer—they're all just UIs with some behavior. They don't need industrial infrastructure.

## Real-World Examples

Ready to see HTML apps in action? Here are four working examples you can clone and customize:

### [Dev Log](https://devlog.hyperclay.com/?editmode=true)
A software developer's work log for tracking daily progress, debugging sessions, and project milestones. Features sortable entries, categorized projects, and a monospace aesthetic. Perfect for maintaining a technical journal or sharing development insights with your team.

### [Writer](https://writer.hyperclay.com/?editmode=true)
A beautiful WYSIWYG editor that lets you write formatted documents with ease. Import images, show off code with syntax highlighting, and render clean HTML. Ideal for bloggers, documentation writers, or anyone who wants to share formatted thoughts without booting up a blog or fighting with Markdown.

### [Kanban](https://kanban.hyperclay.com/?editmode=true)
A Trello-style project organizer with draggable cards across customizable columns. Create workflows that match how you think—from simple todo/doing/done to complex multi-stage pipelines. Each card supports rich content, due dates, and color coding.

### [Landing](https://landing.hyperclay.com/?editmode=true)
Get your landing page up in minutes with this fill-in-the-blanks template that helps you tell your brand's story. Features markdown formatting for easy content updates, responsive design out of the box, and sections for benefits, features, and testimonials. Just edit the text and you're ready to launch.

Each example demonstrates different Hyperclay patterns—from complex DOM/state management in Dev Log to elegant content editing in Writer. Clone any of them to start building your own HTML app.

## Developer Tools

### Editing with developer tools

The browser's Developer Tools aren't just for debugging—they're your live editing environment. Since HTML apps are just HTML files, any change you make in DevTools can become permanent with a save.

**Live HTML editing**: Open DevTools (F12), navigate to the Elements panel, and double-click any element to edit. Add new elements, change attributes, modify text—it all persists when you save.

**Style experimentation**: The Styles panel lets you tweak CSS in real-time. Find the perfect color, adjust spacing, test responsive breakpoints. When you're happy, add the styles inline or in a `<style>` tag.

**JavaScript console as playground**: Test ideas directly in the console with full access to Hyperclay's utilities. Try `$.task.at(0).val.status = 'complete'` or `this.nearest.section.remove()` to see immediate results.

**Network inspection**: Watch the save cycle in action. See exactly what HTML gets sent to the server, monitor resource loading, and debug any issues with file uploads or AJAX calls.

The beauty is there's no compilation step between DevTools and your app. What you edit is what gets saved. The browser becomes your IDE.

**Getting started with DevTools**: Upload any HTML file and start editing it live on the internet using the browser's DevTools. That instant feedback will get you hooked. Then start layering on Hyperclay's attributes, like `edit-mode-contenteditable` so you can inline edit the page directly within the page's UI. There's nothing like seeing your changes live-update using your own UI. Then layer on your own custom edit controls. Now you have an app that's uniquely yours, something that feels like home.

### Debugging with developer tools

The browser's developer tools become your IDE:

1. **Inspect** any element to see its attributes and computed styles
2. **Edit** HTML directly in the Elements panel—changes persist on save
3. **Console** test code with full access to the DOM and Hyperclay utilities
4. **Network** monitor the save cycle and resource loading
5. **Sources** debug inline scripts with breakpoints

Since everything lives in the DOM, everything is inspectable. **The debugging tools are already in your browser.**

## Limitations and Trade-offs

### What Hyperclay isn't

Hyperclay makes explicit trade-offs. It's not suitable for:

- **Complex permissions**: No built-in user system beyond document ownership
- **Sensitive data**: Everything in a document is visible to all users
- **Team development**: No branching, or merge conflict resolution
- **Editing with JS turned off**: JavaScript is required for Hyperclay's editing tools

These limitations are subject to change and improve as we strive to give HTML documents more and more powerful APIs.
### What Hyperclay is

Hyperclay is great for:

- **High-traffic blogs, websites, portfolios**: Serving static HTML files scales infinitely and costs almost nothing
- **Personal tools that grow**: Start with a simple calculator, evolve it into a full planning system
- **Team tools**: Let your team fork a copy of an internal tool for their own use
- **Production-ready from day one**: No "it works on my machine" problems—if it works locally, it works everywhere
- **Safe development**: Every change is versioned, so you never lose data
- **Accessibility**: We serve static HTML files by default, so no JS required to view

**Specific use cases that work well:**
- Website builders and landing pages
- Personal knowledge bases and documentation
- Business dashboards and data visualizations
- Interactive course builders and educational tools
- Project management and work tracking tools
- Resume builders and portfolio generators
- Financial modeling and invoice generators
- Mind mapping and wireframing tools
- Any tool that transforms raw thoughts into an ordered, beautiful interface for a single person

**What doesn't work well:**
- Real-time multiplayer games
- Social networks with complex permissions
- Banking systems with sensitive data
- Video streaming platforms
- Live chat applications

Hyperclay is already powerful and capable of building great personal applications. Unlike traditional deployments that can crash from server overages or require constant monitoring, HTML apps just work. Forever.

### Who is Hyperclay for?

**People who want to focus on the core user experience**: You love making web apps, but hate spending hours setting up build tools. You'd rather focus on what your users will actually see and use, not wrestle with configuration files.

**Developers tired of complexity**: Another simple idea that somehow needs 50 dependencies? Another weekend lost to "npm install" errors? You miss when building for the web felt simple and direct.

**People who like to understand their tools**: You want to see all your code in one place. No hidden files, no magic happening behind the scenes. Just HTML, CSS, and JavaScript you can read and modify.

**Weekend project enthusiasts**: You have a folder full of half-finished experiments. You enjoy tinkering with ideas, but too often the setup kills your momentum before you can bring them to life.

If you have a thousand ideas a year, why should each one require a new framework setup? With Hyperclay, you can have a thousand projects going simultaneously without the mental overhead. Each one is just an HTML file. No dependencies to update, no build configs to maintain, no servers to monitor.

Last weekend, instead of debugging webpack configs, you could have built an actual working app AND had time left over to actually tell people about it it. That's what Hyperclay gives you—the ability to go from idea to working app without hacking through a tangle of thorns first.

### Security considerations

The security model is simple:

- **Viewers** can read the document and interact with client-side features
- **Owners** can modify and save the document
- **Everyone** can see everything in the document (view source)

This transparency has implications:
- Don't store passwords or keys in the document
- Don't process sensitive user data
- Don't rely on client-side validation
- Do embrace the openness for learning and sharing

Like Squarespace, Wix, and Framer, Hyperclay allows inline scripts and event handlers because only document owners—not visitors—can add code. This trust model works well for single-owner applications because it's assumed the creator won't compromise their own site.

### Performance boundaries

As documents grow, performance considerations emerge:

- **Large DOM trees** (>100,000 elements) may slow browsers
- **Inline data** could bloat the initial payload if it gets too large
- **Save operations** transmit the entire document

## The Future of Hyperclay

### From documents to ecosystems

Today, each Hyperclay document lives in isolation. The roadmap envisions interconnected systems:

- **Multi-page applications**: Reference data from and embed other Hyperclay documents
- **Data synchronization**: Subscribe to changes in other documents
- **Collaborative editing**: Sync changes into a single document from multiple authors
- **Shared components and plugins**: Hook into the standard lifecycle to build on Hyperclay
- **Visual programming**: Add powerful components that make editing the DOM more intuitive
- **Making HTML a first-class programming language**: Using advanced HTML markup to create applications
- **Federation**: Run your own Hyperclay instance

The goal isn't to recreate existing complexity at a different layer. **It's to enable composition while preserving simplicity.**

## Why I Built This

Twelve years. That's how long I've been chasing this idea. Through starting a company, building [Remake](https://remaketheweb.com/), pivoting to Hyperclay. It's all driven by one obsession: what if software could feel like shaping a physical object?

I want to hold an entire app in my mind at once. To see every connection, understand every behavior, trace every piece of data to its source. Modern web development fractures this wholeness across so many files and systems that the thing you're building becomes unknowable.

That's why Hyperclay is one file. When everything lives in one place, you can finally see what you've built. And when you inevitably forget what it does, it's easy to pick it up, hold it, and understand it immediately. It's visceral.

## What's a UI that could change the world?

If you've read this far, you understand the vision: **software should be as simple to use and as malleable as clay, while maintaining the unique ability to replicate that digital software has.** 

What's a UI that you wish you had early on in your journey? If you can imagine it, you can capture it in a web-based UI and give other people access to it.

Create it in a single HTML file. Share it. Watch it evolve.

* * *

_The source code is the user interface. The user interface is the application. The application is the source code._

_Ready to play? Press start: [hyperclay.com](https://hyperclay.com)_