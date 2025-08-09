---
title: Hacker's Manual Feedback
publish: true
description: Editorial feedback and improvement notes for refining the Hacker's Manual documentation
---

# Length & Structure
- Problem: 6,000+ words with excessive repetition. Main concepts explained 3-4 times.
- Fix: Reduce to ~2,000 words. Lead with concrete examples, follow with philosophy.
- Goal: stay focused on hackers who want to deep dive into the Hyperclay philosophy and are ready to be convinced this is the way forward

# New format of document: 
# Hyperclay: Self-Modifying HTML Documents

Build a web app in a single HTML file that can edit and save itself.

## What It Is
### One Thing - File as Application
### The Physical and The Digital - Self-Updating File (No backend, database, or build step)
- Diagram: vs traditional stack
### The Google Docs of web apps - Visual editing built into the document
- Start with editing in DevTools (big - you can edit in devtools!)
- Build out a static website
- Layer on your own editing UI to modify the file live
### From Factory to Workshop - Mindset shift
### Summary of section: Self-contained, portable, interactive, malleable documents
- Editing UI
- Unlimited cloning
- Scales just like a static HTML file
- Persists naturally

## Who is it for
- ux focused hackers tired of complexity, who just want to build something over a weekend and release it as a useful tool
  - you have a few ideas per year? not for you
  - you have >10 ideas per week? this is for you

## How It Works
### The Load-Modify-Persist Cycle
### Edit Mode + View Mode in One Package
### The save-strip-restore cycle
- Because the edit mode and view mode are in one UI
- Progressive enhancement through custom DOM attributes and methods
### Visualization:
- Load static file
- Layer Edit UI on top
- Allow user to modify
- Auto-save
- Strip Edit UI
- Persist changes to backend


## Best Practices
### DOM-as-Database 
- DOM is a powerful state machine: a single attribute on an element can control the styling, dependent state, and behavior of everything it encapsulates. 
- Locality of concern over separation of concerns: 
  - Everything is exactly where it is. The HTML is the app. The UI is the app.
    - Callback to physical objects (see and experiment with what makes it work locally)
  - Inline events and the return of onclick
- Template clone pattern
- Event delegation for dynamic content

## Use cases
### Type of apps
- **High-traffic blogs, websites, portfolios**: Serving static HTML files scales infinitely and costs almost nothing
- **Personal tools that grow**: Start with a simple calculator, evolve it into a full planning system
- **Team tools**: Let your team fork a copy of an internal tool for their own use
- **Production-ready from day one**: No "it works on my machine" problems—if it works locally, it works everywhere
- **Safe development**: Every change is versioned, so you never lose data
- **Accessibility**: We serve static HTML files by default, so no JS required to view
### Apps you can build
- Website builders and landing pages
- Personal knowledge bases and documentation
- Business dashboards and data visualizations
- Interactive course builders and educational tools
- Project management and work tracking tools
- Resume builders and portfolio generators
- Financial modeling and invoice generators
- Mind mapping and wireframing tools
- Any tool that transforms raw thoughts into an ordered, beautiful interface for a single person

## Example: Todo App
- Build up to this gradually
  - Introduce task
  - Add editable text
    - edit-mode-contenteditable
  - Add checkbox
    - persist
    - edit-mode-input
  - Add delete button
    - option:editmode
  - How to clone it
  - onclone
  - Add Task button
    - Clone
    - option:editmode
  - Style it?
    - Tailwind base
    - Tailwind play

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <link rel="stylesheet" href="https://hyperclay.com/css/tailwind-base.css">
    <script src="https://hyperclay.com/js/vendor/tailwind-play.js"></script>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
  </head>
  <body class="font-sans max-w-2xl mx-auto mt-10 px-5">
    <h1 edit-mode-contenteditable class="text-3xl font-bold mb-6">Todo App</h1>
    <!-- Tasks -->
    <div tasks class="space-y-3">
      <!-- Hidden template for new tasks -->
      <div task onclone="this.classList.remove('hidden')" class="hidden p-4 bg-gray-100 rounded-lg flex items-center gap-3">
        <input persist edit-mode-input type="checkbox" class="w-4 h-4">
        <span edit-mode-contenteditable class="flex-1">New Task</span>
        <button option:editmode="true" onclick="this.nearest.task.remove()" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
      <div task onclone="this.classList.remove('hidden')" class="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
        <input persist edit-mode-input type="checkbox" class="w-4 h-4">
        <span edit-mode-contenteditable class="flex-1">Learn Hyperclay</span>
        <button option:editmode="true" onclick="this.nearest.task.remove()" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
    <!-- This only shows for admins -->
    <button option:editmode="true" onclick="this.nearest.tasks.append(this.nearest.task.cloneNode(true))" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Task</button>
  </body>
</html>

## Big Ideas
### Build the builder - it's like a website builder (and functions on the same security model), but it lets you build the builder
### Software as physical objects: Prioritizing wholeness/oneness above all other abstractions. To have a feeling of realness in something (which comes in large part by seeing and understanding its wholeness/oneness) is what makes humans feel capable of interacting with something successfully. A more intuitive type of software. Use our full senses and natural environment (navigating space, explore 3d space, 3d sound, use natural motion to animate motion, mimic the real world and our natural instincts instead of shaping our instincts to fit software
  - Complexity is everywhere and it serves a purpose
  - It's often more complex to build a system that feels natural and intuitive to the user than to simply present all the complexity/optionality up front and let the user get lost / have to learn your system. but the best systems not only accomplish a lot behind the scenes (push a button on your phone to summon a car, coming soon: type a prompt to orchestrate a few dozen AIs to plan, build, and iterate on a 3D model of a real house) but also do so in a way that gives the user the right FEELING -- the user needs to be left with a feeling about the impact of what they've done (for example, if there's a problem the user needs to address eventually but not right away, it shouldn't trigger an undismissable UI and it probably event shouldn't pop up anything, but maybe be a low hum background sound that comes from behind them, so they can be aware of it and get to it when they want -- inspired by our own experience of "keeping something in the back of our mind")
  - The web SHOULD be malleable, it was designed to be malleable, it doesn't make sense to have this thing (the internet) that we ALL have access to, but most can only look/touch and not make/mold. it's upsetting, unfair, and dumb.
  - Making files more like physical objects -> digital objects (files that update themselves, getting us one step closer the intuitiveness we feel when experiencing a physical object)
### Evolving the idea UI
  - Because every time someone has a new idea for an app, they have to learn programming, learn to connect a dozen different services together, learn sysadmin, learn devops, learn SQL, and then coordinate everything into a persistence layer with users and objects and files and uploads and blah blah blah blah blah, I believe internet-connected software isn't developing at the speed it's meant to. We haven't come close to the ideal UI/UX for so many different use cases. Just one small iteration on top of the last. 
  - Hyperclay is my attempt to speed this up. By focusing entirely on releasing usable UI/UXs, and allowing anyone to build on what's out there, I believe we can move much faster towards the ideal software interface and behavior of apps across a wide range of fields. More customizable UIs for some cases. More specialized UIs for other cases. Little affordances everywhere. A collaborative ecosystem where we all build on each other and try to create things that feel natural and obvious to use.


## Personal Software
### LLMs
### Layer on an editable UI
### Complete flexibility: publish apps globally, use them locally, allow anyone to build on your work

## Real world examples

## DevTools

Since everything lives in the DOM, everything is inspectable. **The debugging tools are already in your browser.**

## Why I Built This
Tired of being able to pick up a piece of paper and create something awesome, but not having an easy corrolary in the digital world.
Seems absurd to me that web apps have been around for decades now and we haven't nailed down the parts of the stack into the browser, so anyone can boot up a file, drag some rectangles around, add some text, and made a dynamic page anyone else can use.

## Future of Hyperclay

From documents to ecosystems

Today, each Hyperclay document lives in isolation. The roadmap envisions interconnected systems:

- **Multi-page applications**: Reference data from and embed other Hyperclay documents
- **Data synchronization**: Subscribe to changes in other documents
- **Collaborative editing**: Sync changes into a single document from multiple authors
- **Shared components and plugins**: Hook into the standard lifecycle to build on Hyperclay
- **Visual programming**: Add powerful components that make editing the DOM more intuitive
- **Making HTML a first-class programming language**: Using advanced HTML markup to create applications
- **Federation**: Run your own Hyperclay instance

The goal isn't to recreate existing complexity at a different layer. **It's to enable composition while preserving simplicity.**

## Common Questions
**"Why not just use localStorage?"**
**"Why not just build a small React app?"**

## Concerns
### Security Model 
- it's like a website builder (and functions on the same security model). we trust users to have full control over their own app, locally and hosted.
  - Permission system: only owners can edit their own apps
  >>> i personally don't think XSS/CSP/sanitization are issues we need to address because it's the same security model as a website builder, but if you have a different opinion, please share it below
### What NOT to build
- social networking app
- apps to hold private data (unless used only locally)
- team software
- multiplayer games or apps that require real-time syncing
- apps that require backend processing
- live chat apps

## Limitations (with tables)
- Single-user editing (for now)
- All code is Client-visible
- 3MB DOM limit

Something like this:
| Metric | Recommended | Maximum | Impact |
|--------|------------|---------|---------|
| DOM nodes | <10,000 | 100,000 | Page responsiveness |
| File size | <1MB | 10MB | Load time |
| Inline data | <100KB | 1MB | Parse time |

## Who owns your app?
By default, everything hosted on Hyperclay is released under an MIT license. It's imperative that people are able to build on each others work. If you want to specify a different license in your source code, you are free to. 

## What's a UI that could change the world?
Build it