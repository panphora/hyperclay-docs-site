---
title: 06. Example Apps
publish: true
description: Collection of simple Hyperclay example applications demonstrating core concepts in under 30 lines of HTML each
---

## Simple Example Apps

These minimal examples show the core concepts of Hyperclay. Each is a complete, working application in under 30 lines of HTML.

### Counter

A simple counter that persists its value between page loads.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
</head>
<body>
    <div style="padding: 20px; text-align: center;">
        <h1>Counter: <span class="counter" persist>0</span></h1>
        <button onclick="this.nearest.counter.textContent++">+</button>
        <button onclick="this.nearest.counter.textContent--">-</button>
    </div>
</body>
</html>
```

### Todo List

A minimal todo list using the template-clone pattern.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
</head>
<body>
    <h1>My Todos</h1>
    <ul sortable>
        <li class="task" style="display:none" onclone="this.style.display='block'">
            <input type="checkbox" persist>
            <span edit-mode-contenteditable>New task</span>
            <button onclick="this.nearest.task.remove()">×</button>
        </li>
    </ul>
    <button onclick="this.nearest.task.before(this.nearest.task.cloneNode(true))">Add Task</button>
</body>
</html>
```

### Note Pad

A simple notepad that saves as you type.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
    <style>
        textarea { width: 100%; height: 400px; padding: 10px; font-family: monospace; }
    </style>
</head>
<body>
    <h1>My Notes</h1>
    <textarea persist placeholder="Start typing..."></textarea>
</body>
</html>
```

### Timer

A basic stopwatch with start, stop, and reset functionality.

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://hyperclay.com/js/hyperclay-starter-kit.js" type="module"></script>
  <script src="https://cdn.jsdelivr.net/npm/easytimer.js@4.6.0/dist/easytimer.min.js"></script>
</head>
<body>
  <div style="text-align: center; padding: 50px;">
    <h1 id="display">00:00</h1>
    <button onclick="timer.start()">Start</button>
    <button onclick="timer.pause()">Stop</button>
    <button onclick="timer.stop(); display.textContent = '00:00'">Reset</button>
  </div>
  <script>
    const timer = new easytimer.Timer();
    
    timer.addEventListener('secondsUpdated', function (e) {
      display.textContent = timer.getTimeValues().toString(['minutes', 'seconds']);
    });
  </script>
</body>
</html>
```

###### "These aren't apps, they're just HTML pages you can modify!!" 
Yes :)

## Advanced Example Apps

Ready-to-use applications that demonstrate Hyperclay's full potential. Each can be cloned and customized for your needs.

### [Dev Log](https://devlog.hyperclay.com/?editmode=true)

A software developer's work log for tracking daily progress and debugging sessions.

- **Features**: Sortable entries, project categorization, monospace aesthetic
- **Use case**: Technical journaling, development notes, team updates
- **Key patterns**: DOM-based data storage, sortable lists, inline editing, category toggling

### [Writer](https://writer.hyperclay.com/?editmode=true)

A beautiful WYSIWYG editor for creating formatted documents.

- **Features**: Rich text editing, image imports, syntax highlighting
- **Use case**: Blog posts, documentation, formatted notes
- **Key patterns**: Script as JSON database

### [Kanban](https://kanban.hyperclay.com/?editmode=true)

A Trello-style project management board with drag-and-drop functionality.

- **Features**: Draggable cards and columns, inline editing
- **Use case**: Project tracking, workflow management, task organization
- **Key patterns**: Template cloning

### [Landing](https://landing.hyperclay.com/?editmode=true)

A professional landing page template that's ready to customize.

- **Features**: Responsive design, markdown content, fill-in-the-blanks
- **Use case**: Product launches, marketing pages, startups
- **Key patterns**: Edit-mode popovers, undo/redo support