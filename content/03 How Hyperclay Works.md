---
title: How Hyperclay Works
publish: true
description: Understanding the core concept behind Hyperclay - a platform for hosting self-modifying HTML pages that act as both frontend and database
---

## The Big Idea

I got tired of how many steps are required to put a malleable page on the internet, so I decided to build a simple solution:

Hyperclay is a platform that lets you host HTML pages that can overwrite themselves.

We call these "HTML apps".

HTML apps can be modified in Hyperclay's code editor or even from your browser's DevTools, and changes you make to them from anywhere will be persisted.

Meanwhile, visitors to your page will see the read-only version, so they'll see your changes but won't be able to modify your page themselves.

Where things get really powerful is when you layer an editable UI on top of your page — then you don't have to go to the code editor or open DevTools, you can just open up your site and start modifying it right there.

It feels like magic: to have a malleable, persistently online object that you can shape in real-time.

That's what Hyperclay is all about: the feeling of shaping the internet, as easy as opening and modifying a Google Doc.

## HTML as DB

Since each page's HTML is its own source of truth, the process it uses to update itself is important.

Here's how it works:
1. You load the page with edit-mode off
2. Hyperclay checks to make sure you're the owner of the page
3. If you're the owner, edit-mode is turned on

This means you get all the powerful admin-editing tools layered on top of the page if you're the owner.

But regular viewers just see a static website.

## Authentication

Hyperclay uses cookie-based authentication to identify site owners. When you create a site or log in, Hyperclay sets a secure cookie that identifies you as the owner. This cookie is checked on every page load to determine if edit mode should be enabled. The authentication is handled entirely by Hyperclay's servers - you don't need to implement any auth logic in your HTML.

## The Save Cycle is Very Important

The save cycle is the most important thing to understand about how Hyperclay works.

Here's how it works:
1. You, as the owner, load the page
2. Hyperclay detects that you're the owner and helps you make things editable
3. You modify the page using the editable UI you built
4. You save the page
5. Hyperclay strips out all the editable UI and saves the page

To make this save cycle easier to handle, we have a script you can use:

## Hyperclay's starter pack

`<script defer src="https://hyperclay.com/js/hyperclay-starter-kit.js"></script>`

I recommend using this on all Hyperclay projects. It does a few things really well.

1. It persists all form input values that have a special `persist` attribute (e.g. `<input type="checkbox" persist>` will persist its `checked` state to the DOM)
2. It saves the page whenever I press the keyboard shortcut `Ctrl + s`
3. Before saving
	1. It strips all admin attributes marked with `edit-mode` (`edit-mode-onclick`, `edit-mode-contenteditable`, `edit-mode-input`)
	2. It renders all admin resources inert if they have a special `[edit-mode-resource]` attribute (think: disables admin-only JS/CSS)
	3. It hides all admin UI with an `[option:edit-mode="false"]` attribute on it and shows any admin UI with an `[option:edit-mode="true"]` attribute
	4. It runs any function inside of an `onbeforesave` attribute (e.g. `onbeforesave="this.remove()"`)
	5. It runs all callbacks passed to `hyperclay.onBeforeSave(cb)`, so you can do more advanced cleaning here (e.g. `hyperclay.onBeforeSave(documentElement => documentElement.querySelectorAll(".remove-this").forEach(el => el.remove()))`
4. After the page load, it adds back all admin attributes and UI elements if the user is the owner

It's a simple and easy way to make HTML editable and persistent without having to build a saving library yourself.

## The Goal: Portable, Single-File HTML Apps

HTML apps should be self-contained and portable. 

Any user should be able to download an HTML app and use it themselves in `edit-mode` locally, just as if they were the original author.

This means:
1. Always use fully-qualified URLS (use `https://hyperclay.com/js/hyperclay-starter-kit.js` not `/js/hyperclay-starter-kit.js`)
2. It's often simpler to leave `edit-mode` HTML in the DOM and hide it for non-owners — instead of removing it and recreating it every time
