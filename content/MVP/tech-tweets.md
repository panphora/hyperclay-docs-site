really really really interesting code that keeps you close to the bare metal of the DOM

elegant, easy-to-understand-at-a-glance, and straightforward


- `getComputedStyle()` for reading actual styles (useful for debugging, you can grab computed styles on current element and all its parents to paste into an LLM to help it help you debug)
- use event delegation and always use element.closest() in event listeners
- store state as high up in the DOM as you can, so it can control the behavior and styles of the page enclosed by it
   - storing state in attributes as opposed to state management libraries is great because you can control both behavior and styles with it at the same time
- show a compelling use case for document.createTreeWalker()
- show a compelling use case for :scope (maybe a modal inside a modal or something similar)
- (warn: not standard practice, but convenient sometimes) for convenience, you can attach any variable to a DOM element, they're just objects
- (warn: not standard practice, but convenient sometimes) you can add methods and properties to all DOM nodes, to make it easier to work with the DOM and add some missing methods (e.g. `nearest` which searches up the DOM and all sibling elements recursively to find you the nearest matching element to the current element)
- `<fieldset disabled>` to disable entire form sections
- come up with a compelling use case for `once: true` option in addEventListener
- always use pointerdown instead of mousedown
- `structuredClone()` for deep copying (no more JSON.stringify/parse hack)
- compelling use case for `document.implementation.createHTMLDocument()` for sandboxed parsing
- create a small library for using DOM as state storage
- compelling use case for `element.classList.toggle()` with force parameter
- compelling use case for element.animate
- compelling use case for `:has()` selector for parent selection
- watch out for weird IntersectionObserver bugs
- watch out for weird position: sticky issues (doesn't behave exactly like fixed, you sometimes can't put it in a parent element)
- watch out for random cross browser `loading="lazy"` issues
- `will-change` CSS property sometimes fixes unusual visual glitches
- canvas animations? use time-based animation, so movement is consistent regardless of frame rate, and players on slower devices see the same game speed as those on faster ones
- don't use Clipboard API for copy/paste, use old style code for copying to clipboard and you don't have to ask user permission
- use File API and FileReader to store and manipulate base64 data directly in the DOM (if you can't upload it for some reason)
- Optional chaining `?.` as the most useful code beautifying tool released recently
- compelling nullish coalescing `??` use case not fulfilled by `||`?
- use Tagged template literals to create your own templating library
- turn any file into a tagged template literal by dropping it in an eval equivalent
- compelling use case: Proxy for reactive objects
- `element.cloneNode(true)` for deep cloning
- be careful with using objects instead of plain values in React and Vue (gotchas)
- compelling use case for `pointer-events: none` for click-through (maybe if you have a popover inside of another interactive element or something)
- `document.elementFromPoint()` for hit testing



















