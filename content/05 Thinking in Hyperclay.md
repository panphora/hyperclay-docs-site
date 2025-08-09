---
title: Thinking in Hyperclay
publish: true
description: A guide to shifting your mindset from traditional web development to building portable, dynamic HTML documents with Hyperclay
---

We encourage thinking differently about how you build a hyperclay app than you would a regular app.

The idea behind Hyperclay is that you have a new kind of document. It's a web document, but it's dynamic, portable, fungible. You can pass it around to your friends. Or host it anywhere. It's portable, light, easy-to-think about. 

## Traditional Web App vs Hyperclay

| Traditional Web App | Hyperclay App |
|-------------------|---------------|
| Separate frontend/backend | Single HTML file |
| Database queries | DOM as database |
| API endpoints | Direct DOM manipulation |
| Build process | No build needed |
| Multiple files | Self-contained document |
| Complex state management | DOM attributes as state |

Regular apps have lots of moving pieces, lots of parts to integrate together from different areas of the stack. For this reason, principles like DRY and separation of concerns matter a lot more.

But with Hyperclay, it's the opposite. You want to mush everything together. Keep locality of concern. If you look at a piece of your HTML later, even just a small piece, you should understand how it functions in itself and as part of the wider project within a few seconds.

### Example: Traditional vs Hyperclay Toggle

Traditional approach:
```javascript
// script.js
document.getElementById('toggle').addEventListener('click', () => {
  fetch('/api/toggle-setting')
    .then(res => res.json())
    .then(data => updateUI(data));
});

// Separate API endpoint, database update, etc.
```

Hyperclay approach:
```html
<div settings-panel="closed">
  <button onclick="this.closest('[settings-panel]').setAttribute('settings-panel', 
    this.closest('[settings-panel]').getAttribute('settings-panel') === 'open' ? 'closed' : 'open')">
    Toggle Settings
  </button>
  <div option:settings-panel="open">Settings content here...</div>
</div>
```

Your document should look and behave simpler than an app, where behaviors and UI and state are so separate and so different from each other. A hyperclay document should feel more like a state machine. Something flat and grokable. Declarative is the word I'm looking for. It's not like a regular web app, with a bunch of GOTO-like syntax, like AJAX calls that trigger backend functionality, that sends a response, that ends up in some other piece of higher-level state in your app. No, it's just a DOM tree. You change state somewhere, just once, and the behavior and UI change appropriately. It's no big deal. 

To build an app on Hyperclay, you build your front-end how you'd normally build it, using whatever vanilla JS libraries you want.

Add all the admin controls and editable areas you want, but try to keep them supplemental to the page, so removing or hiding them won't affect the flow of the page that much.

For most cases, the DOM will act as a natural database, which means you don't have to worry about anything. The user will edit the text of an element and that element will not be modified. The user will move an element somewhere else, and now that element will be permanently moved.

But for special cases, you may want to store data as JSON or another special format. In this case, I'd recommend using a `<script type="application/json">` tag and using it as a database you can read, write, and update.

### Example: Using JSON for Complex Data

```html
<script type="application/json" id="app-data">
{
  "users": [],
  "settings": {
    "theme": "light",
    "notifications": true
  }
}
</script>

<script>
// Read data
const data = JSON.parse(document.getElementById('app-data').textContent);

// Update data
function updateTheme(theme) {
  data.settings.theme = theme;
  document.getElementById('app-data').textContent = JSON.stringify(data, null, 2);
}
</script>
```

The fun thing about using the DOM as your database is the DOM's tree structure. Since it has cascading nodes and branches, each level of those nodes and branches is a natural component. It only needs to be tagged to create a natural encapsulation of functionality and state. 

Another neat feature is the way attributes and their values can be used to simultanteously store behavior, information, and appearance. This makes it a state machine and a hierarchical declarative UI/UX model. This is a powerful combination, allowing you to encode a lot of cascading options and functionality in the toggle of a single attribute value.

When you want people to administrate your page, I highly recommend using the `onclick`, `oninput`, `onsubmit` attributes. Inline event handlers are great at encapsulating bite-size pieces of functionality and they live local to where the activity is happening. It easy to design an app that's simple, where everything can fit into your head.

I even created a custom jQuery alternative just for this purpose: to be syntactically concise enough to fit into inline event attributes. You can also just use jQuery, it's a great fit for hyperclay, but you have a second option as well: dollar.js.

### Example: dollar.js in Action

```html
<!-- Toggle all panels at once -->
<button onclick="$.panel.classList.toggle('expanded')">Toggle All Panels</button>

<!-- Filter and remove draft items -->
<button onclick="$.item.filter(el => el.dataset.status === 'draft').remove()">
  Clear Drafts
</button>

<!-- Update multiple elements -->
<button onclick="$.price.forEach(el => el.textContent = '$' + el.textContent)">
  Format Prices
</button>
```

It's much preferable to hide admin controls instead of removing them from the page entirely. This gives us less to worry about dynamically adding when the page loads and sticks to the model of a hypermedia application, where state and associated functionality is fully loaded into the page at all times. For conditionally showing/hiding UI, we have the excellent `option:` attributes.

### Example: Using option: Attributes

```html
<!-- Show different content based on user role -->
<div user-role="guest">
  <div option:user-role="guest">
    <button onclick="this.closest('[user-role]').setAttribute('user-role', 'admin')">
      Login as Admin
    </button>
  </div>
  <div option:user-role="admin">
    <h3>Admin Panel</h3>
    <button onclick="this.closest('[user-role]').setAttribute('user-role', 'guest')">
      Logout
    </button>
  </div>
</div>
```

If you need to do more complex operations to prepare a page for viewing by anonymous web visitors, you can allow a few `onbeforesave` attributes. These are powerful because you can run any arbitrary JS inside them you can think of.
