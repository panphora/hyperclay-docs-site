---
title: 04. Tutorial - Time Tracking App
publish: true
description: Build a real-world time tracking app with Hyperclay - a practical tutorial based on an actual contractor hours tracking solution
---

This is a real life example. I'm working as a web dev contractor at my current job, right now. I was planning to work a little extra through August because my new baby was due in September and I wanted to take some time off. 

I needed a quick and easy way to track the extra hours I worked each week, so my boss could approve those hours.

"Wouldn't it be great," I thought, "if I could just slap some checkboxes on a page and call it a day? I could update those checkboxes, my boss could see how many were checked, and we'd both be happy."

Unfortunately, there's no easy stack for such a simple application — unless, I use this new platform I'm working on and had just deployed.

So I opened a web page, added a beautiful classless stylesheet called [pico.css](https://picocss.com/), and added a few hundred checkboxes.

Try it here: https://hours.hyperclay.com/?editmode=true

## Step-by-Step Build Process

### Step 1: Create the Basic HTML Structure
Start with a simple HTML page and include Hyperclay's starter kit:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hours</title>
  <script type="module" src="https://hyperclay.com/js/hyperclay-starter-kit.js"></script>
</head>
<body>
  <h3>Hours</h3>
</body>
</html>
```

### Step 2: Add Styling
Include Pico CSS for instant beautiful styling:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
```

### Step 3: Create the Time Tracking Interface
Add checkboxes for each hour, organized by week:

```html
<div>
  <h5>Week 1</h5>
  <input type="checkbox">
  <input type="checkbox">
  <!-- Add 8 more for 10 hours total -->
</div>
```

### Step 4: Make It Persistable and Admin-Only
Add the magic Hyperclay attributes:
- `persist` - Saves checkbox state to the DOM
- `edit-mode-input` - Only admins can check/uncheck
- `disabled` - Default disabled state for viewers

```html
<input type="checkbox" edit-mode-input persist disabled>
```

## Understanding the Key Attributes

- **`persist`**: This attribute tells Hyperclay to save the checkbox's checked state directly to the DOM. When you check a box and save (Ctrl+S), the `checked` attribute is added to the HTML.

- **`edit-mode-input`**: This makes the input only interactive for the site owner. Visitors see a disabled checkbox.

- **`disabled`**: The default state is disabled. The Hyperclay starter kit removes this for admins only.

## View Mode vs Edit Mode

**As a visitor**, you see:
- Read-only checkboxes showing hours worked
- Clean, professional time tracking display
- No ability to modify the data

**As the owner**, you see:
- Fully interactive checkboxes
- Ability to check/uncheck hours
- Changes save automatically with Ctrl+S

## Complete Code

```html
<!DOCTYPE html>
<html lang="en" editmode="false">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hours</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <style>
    body {
      max-width: fit-content;
      margin: 40px auto;
      padding: 1rem;
    }

    body>div h5 {
      margin-bottom: 0.5rem;
    }

    body>div+div {
      margin-top: 1rem;
    }
  </style>
  <script type="module" src="https://hyperclay.com/js/hyperclay-starter-kit.js"></script>
</head>
<body>
  <h3>Hours</h3>
  <div>
    <h5>Week 1</h5>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
  </div>
  <div>
    <h5>Week 2</h5>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
  </div>
  <div>
    <h5>Week 3</h5>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
  </div>
  <div>
    <h5>Week 4</h5>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
    <input type="checkbox" edit-mode-input persist disabled>
  </div>
</body>

</html>
```