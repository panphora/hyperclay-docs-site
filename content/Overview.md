---
title: Overview
publish: true
description: An introduction to Hyperclay - the platform for creating self-contained, editable HTML applications
---

- Have you ever tried editing a website directly in your browser and wished your changes would stick?  
- Do you enjoy simple, self-contained projects where everything can fit in your head?
- Are you curious about how to share an interactive HTML project that others can see — and maybe even edit?  

---

**Meet Hyperclay — A Single-File Approach to Web Dev**

Hyperclay lets you get personal software out the door and launched so people can actually use it instead of it sitting in a folder on your desktop. It does this by allowing you to pack up all your frontend functionality into a single HTML file and release it as a standalone, lightweight app.

* All markup, styles, scripts, and admin UI live in one HTML file
* Download and open locally for an instant working app
* Drop the same file on any server so others can view or even edit it

---

**How it works**

Hyperclay hosts single HTML files that you can edit anywhere — locally, in a cloud editor, or directly in the page’s own UI. 

When you’re the page owner, your changes persist. If you’re not, you’ll only see the view mode of the page, and any tweaks you make won’t save. 

When you’re ready to share your creation, you can host it on Hyperclay or any server you prefer. Until then, it’ll work right on your desktop.

---

**Why This Matters**

Imagine if your browser could write to your computer’s file system. You’d open an HTML file, change stuff, and it would stay changed. 

That’s the essence of Hyperclay: one small file with everything you need to create simple, persistent apps. It's just a plain HTML file + a little hyperclay-starter-kit script, no special file extension or framework required.

---

**What You Can Build**

Want to track your workouts? Make a personal devlog? Record voice memos? You can do all this (and so much more) with Hyperclay. 

It’s still just front-end HTML + CSS + JS, so anything you can normally do on a static website is possible — just packed into a single, server-persisted file.

---

**"Why not just use localStorage?"**

localStorage only saves changes on your own machine. If you want others to see your work, you need a server to store those changes and keep track of who can edit what. 

Hyperclay handles that for you, syncing your edits so everyone sees the same final page.

---

**“Why not just build a small React app?”**

Sure, React/Vue/Svelte are great when you’re working on larger projects or you need complex state management. 

But even with the simplest React app, you’re usually spinning up Node, installing dependencies, configuring bundlers, and publishing to a hosting service. Hyperclay cuts through that. 

It’s literally one HTML file you open in a browser and edit.

---

**How about user accounts and saving data?**

Hyperclay has its own approach. 

By default, everyone views the same read-only page. You only see editing controls if you’re the page owner (logged in via the Hyperclay service). As the owner, your edits automatically save and sync to the server so the new version you made loads for everyone else. 

Owning a page is as simple as creating a Hyperclay account and picking a password, so it’s easy to manage without messing around with complex server configs.

---

**View vs. Edit Mode**

Hyperclay pages have two modes. 

Most people see the view mode: a static page that works like any website. 

Owners see edit mode: special controls to rearrange components, update text, or add new features. Owners can log in, edit the page, and save changes so others see the updated version. Special controls get stripped out or hidden again when you save, so regular visitors keep seeing a clean, read-only page.

Hyperclay's starter kit comes with built-in admin attributes (`edit-mode-contenteditable`, `edit-mode-input`, `edit-mode-resource`, etc.) that make elements editable for admins, persist those changes to the DOM, and strip those attributes so the page is view-only for regular visitors.  

---

**Starter Pack**

The `hyperclay-starter-kit.js` script can automatically handle persisting form inputs, toggling admin attributes, and saving whenever changes occur.  

It also has lots of other utilities and special attributes, e.g. hooks like `onbeforesave` for final cleanup before you commit your changes. 

---

**Offline Editing/Local Apps**

These are your apps. Hyperclay retains no ownership over them. 

Once you download them locally, you can use them on your own machine offline. Want to sync them back up? Publish your changes later when you're back online.

---

**How It Works**

All the editing code lives in the same HTML file as the read-only code. Whenever you save, Hyperclay strips out the admin interface so visitors just see the finished product. If you’re the owner, scripts re-inject the editing tools when you reload the page.

---

**DOM as Database**

The concept of letting the DOM itself store your data is central. You can use `contenteditable` elements or toggled checkboxes as state, so you don’t have to rely on separate JSON files or a “real” database. For more complex data, you can store JSON in a `<script type="application/json">` tag.

---

**Always Backed Up**

Editing the web on the web in real-time with your own UI is exhilerating, especially when other people can easily clone your UI, but you'd lose a lot of data to accidental DOM mutations if your page wasn't backed up on every save. 

Hyperclay saves a permanent, non-overwriteable version of your page whenever it's saved, so you can play without worrying.

---

**A Quick Example**

```
<script type="module" src="/js/hyperclay-starter-kit.js"></script>
<div contenteditable edit-mode-contenteditable></div>
```

This is a basic, fully-working Hyperclay app. You don't technically need the starter kit or the `edit-mode-contenteditable` attribute, but here's what they handle for you:

1. Save the page when the DOM changes (or when the save keyboard shortcut is pressed)
2. Disables the `contenteditable` attribute before saving (so regular viewers can't edit the page)
3. Enables the `contenteditable` attribute if a page owner loads this page

---

**Forking and Sharing**

Anyone can download your Hyperclay file and run it on their own computer/server to become the new owner. The single HTML file is entirely self-contained.

---

**The Basic Cycle**

1. Load the page in view mode
2. If you’re the owner, edit mode is enabled and loads up your editing controls
3. When you save, everything reverts to view mode before being stored

---

**Who is Hyperclay for?**

- Beginners: If you’ve only dabbled in HTML/CSS but want to publish interactive apps without diving into a full-blown framework
- Tinkerers/Hackers: If you like exploring the edge of what's possible on the front-end web and hate fussing with layers of tooling
- Micro-app Creators: If you have a small idea and want a self-contained solution that isn’t spread across a complex stack

**Where’s the Catch?**

Of course, Hyperclay isn’t the best option if you’re building a giant e-commerce site or need super-sophisticated routing, databases, or user groups. 

But for personal projects, prototypes, or simple tools, it’s refreshing and powerful. It feels simple, like writing a Google Doc.

**Why I Built This**

I love the idea of minimal friction. Most web dev stacks these days involve scaffolding, deployments, and a bunch of dependencies. 

Hyperclay strips all that away, leaving you with a single file and a server that “just works.” It’s a fun return to simpler times, without sacrificing the best parts of modern web dev. Hyperclay is truly frictionless—no installation steps, no bundlers, and no config. 

Just one file. Period.

**It feels like the web’s original vision.**

> “The Web was designed as an interactive space where everyone can edit.” — Tim Berners-Lee

Back in the early days of the web, some of its creators imagined it as a place where you could “View Source” on any page, tweak it, then re-publish. 

In practice, you usually need hosting, version control, SSH keys, and a million dev tools. 

Hyperclay tries to bring back the playful part of the web: open an HTML file, make a change, and see it reflected immediately—no complicated pipeline.

**Get Started**

Hyperclay doesn’t replace React or Next.js or your favorite stack. It’s a different way of publishing small, interactive HTML files that feel alive the moment you open them. 

If that resonates with you, give it a spin.

Try making your own devlog or a mini to-do list as your first Hyperclay project — just open a blank .html file, add your markup, and watch it work with little effort from you.

I’d love to hear your questions or see what you build. Hyperclay might look small, but it unlocks a world of possibilities in just one file. 

Enjoy—and, as always, happy hacking!  

Ready to start? [[01 Docs TLDR - Paste in LLM]] to learn about publishing your first app.


