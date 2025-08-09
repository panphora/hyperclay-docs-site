# DOM Tricks Brainstorm for Indie Devs

## Target Persona Reminder
- Loves vanilla JS and direct manipulation
- Values simplicity and understanding over abstraction
- Has 99 side projects, needs things that fit in their head
- Flow-state seekers who hate configuration
- Want portable, hackable, understandable code

## Brainstorm Categories

### 1. DOM Selection & Traversal Magic
- `document.all` - the weird falsy object that still works
- `element.closest()` - traverse up to find parent by selector
- `element.matches()` - check if element matches selector
- `document.getElementById()` is faster than querySelector for IDs
- `:scope` pseudo-class in querySelector for relative queries
- `element.nextElementSibling` vs `nextSibling` (skip text nodes)
- `document.createTreeWalker()` for efficient DOM traversal
- `element.compareDocumentPosition()` for relative positioning

### 2. Form & Input Tricks
- Wrapping inputs in labels for automatic association (no id needed)
- `form.elements` named collection for easy access
- `input.validity` for native validation states
- `input.valueAsNumber` and `input.valueAsDate` 
- `<datalist>` for native autocomplete
- `formdata` event for intercepting form data
- `input.setCustomValidity()` for custom validation messages
- `<output>` element for calculation results
- `form.reset()` to clear all fields
- `<fieldset disabled>` to disable entire form sections

### 3. Event Handling Gems
- `once: true` option in addEventListener
- `passive: true` for scroll performance
- `signal` for AbortController cleanup
- Event delegation with `event.target.closest()`
- `pointerdown` vs `mousedown` for unified input
- Custom events with `new CustomEvent()`
- `event.preventDefault()` vs `return false`
- Global error/unhandledrejection events

### 4. Native Storage & State
- `element.dataset` for data attributes
- `structuredClone()` for deep copying
- `URL` and `URLSearchParams` for URL manipulation
- `localStorage` events for cross-tab communication
- Using `<template>` for HTML templates
- `document.implementation.createHTMLDocument()` for sandboxed parsing
- WeakMap for private properties
- Using DOM as state storage (the Hyperclay way!)

### 5. CSS/Style Manipulation
- `element.classList.toggle()` with force parameter
- `getComputedStyle()` for reading actual styles
- CSS custom properties as JavaScript variables
- `element.animate()` Web Animations API
- `matchMedia()` for responsive JavaScript
- `:has()` selector for parent selection
- `@supports` in JavaScript via CSS.supports()
- Inline styles vs setAttribute('style')

### 6. Performance & Optimization
- `requestIdleCallback()` for background tasks
- `IntersectionObserver` for lazy loading
- `ResizeObserver` for element size changes
- `MutationObserver` for DOM changes
- `<link rel="preload">` for resource hints
- `loading="lazy"` for images
- `will-change` CSS property
- DocumentFragment for batch DOM updates

### 7. Little-Known Elements
- `<details>` and `<summary>` for native accordions
- `<dialog>` element with showModal()
- `<meter>` and `<progress>` elements
- `<picture>` for responsive images
- `<template>` and `<slot>` for web components
- `<output>` for form calculations
- `<time>` with datetime attribute
- `<data>` element for machine-readable data

### 8. Browser APIs That Replace Libraries
- `fetch()` with async/await patterns
- `Intl.*` for formatting (dates, numbers, etc.)
- Web Crypto API for hashing/encryption
- Clipboard API for copy/paste
- File API and FileReader
- Geolocation API
- Notification API
- Speech Synthesis API

### 9. Developer Experience Helpers
- `console.table()` for data visualization
- `console.time()` and `console.timeEnd()`
- `debugger` statement
- `console.assert()` for inline testing
- `console.group()` for organized logging
- `performance.mark()` and `performance.measure()`
- Live expressions in DevTools
- `$0` in console for selected element

### 10. Modern JavaScript Patterns (Vanilla)
- Optional chaining `?.` and nullish coalescing `??`
- Destructuring in function parameters
- Tagged template literals for DSLs
- Proxy for reactive objects
- Generator functions for iteration
- Private fields with `#`
- Top-level await
- Import maps for dependency management

### 11. Accessibility Shortcuts
- `aria-live` regions for announcements
- `inert` attribute to disable sections
- Focus management with `tabindex`
- `:focus-visible` for keyboard navigation
- `prefers-reduced-motion` media query
- Native date/time inputs vs custom
- Semantic HTML that's accessible by default

### 12. One-Liners That Replace jQuery
- `element.remove()` instead of `$(el).remove()`
- `element.before()`, `element.after()`, `element.prepend()`, `element.append()`
- `element.replaceWith()`
- `element.cloneNode(true)` for deep cloning
- `fetch()` instead of `$.ajax()`
- `element.closest()` instead of `$(el).parents(selector)`

### 13. State Management Without Libraries
- Using data attributes as state
- Custom events as state changes
- URL as state (history API)
- CSS classes as state indicators
- Form elements as natural state containers
- LocalStorage + storage events for persistence
- DOM structure as implicit state

### 14. Micro-Optimizations
- `<script defer>` vs `<script async>`
- When to use `innerHTML` vs DOM methods
- `textContent` vs `innerText`
- Caching length in loops
- Event delegation vs individual listeners
- DocumentFragment for batch inserts
- CSS containment for rendering performance

### 15. Fun/Weird DOM Facts
- `document.all` is falsy but truthy
- `contenteditable` makes any element editable
- `designMode` for whole document editing
- `user-select: none` for preventing selection
- `pointer-events: none` for click-through
- `resize` CSS property for resizable elements
- `document.elementFromPoint()` for hit testing

## Top Candidates for Tweets
Based on the persona (simple, direct, useful for side projects):
1. Label wrapping for accessibility
2. Form.elements for easy form access
3. Dialog element for modals
4. Details/summary for accordions
5. Once: true for event listeners
6. Dataset for data storage
7. Template element for reusable HTML
8. ClassList.toggle with force
9. StructuredClone for deep copying
10. Intersection Observer for lazy loading
11. Console.table for debugging
12. Fetch with async/await patterns
13. Native form validation
14. Custom events for components
15. URL/URLSearchParams for routing