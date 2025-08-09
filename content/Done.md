




√Allow toast to be styled
* √Default toast will work against dark mode or light, any app
	* √ Design new style
	* √Code new style
	* √This default style will be used for all example apps
* √Custom style will apply to Hyperclay only
	* √Extract Hyperclay `toast` style
* √2s auto save debounce
	* √Re-enable auto save
	* √Show toast on auto save

√Custom Domain Support
* √ Implement basic support
* √ Improve some areas / fix some issues
* √ Use a page instead of modal
* √Test custom domains until they work
	* √Apex
	* √Sub domain
* √Deploy custom domain support
	* √Should I generate new env vars for production (?)
	* √Add 4 env variables
	* √Run migration

√Hyperclay Local
* √ Make working desktop app with Electron
* √ Fix bugs
* √ Create README
* √ Design UI for app
* √ Build UI for app
* √ Tried converting app to light weight alternative neutralinojs, but it didn't work as well
	* √ Not as tried and tested and not as many docs as Electron
* Make `/download` page for every HTML app
	* Design page
	* User clicks to download HTML file
	* Has instructions with a button to go to https://localhyperclay.com/local-hyperclay/

√Get Started page: simple page with screenshots like this: [Step-by-Step Guide - Implement Custom Domains in Your Node.js SaaS App](https://saascustomdomains.com/blog/posts/implementing-custom-domains-for-your-saas-app-in-node-js)
* √four screenshots, show off the platform
	* √Create app
	* √Choose from library of apps
	* √Edit HTML code
		* √Include starter kit script for extra powers (optional)
	* √Update your page using its UI
	* √Visit your published page
		* √Append ?editmode=false to see what the public will see
* √clean up / shorten text

√App: Deploy landing page
* √Test quickly
* √Paste HTML
√App: set custom domain for **panphora.com**

√ 20 min video
* √ Make persona
* √ Make outline of video
* √ Make slides for video
* √ Improve slides
* √ Generate audio for slides
* Core
	* Single file apps
	* Feature-benefits
		* Malleable —make a UI that updates itself
		* Portable — desktop apps for free
		* Shareable — all the benefits of online
	* Benefits
		* The simplicity of being able to hold a whole app in your head
		* The ability to see all the data and behavior right there
		* The ability to complete a working app and call it finished
	* Show 4 example apps
	* To start:
		* Create an HTML file that can modify itself
		* Add the hyperclay starter kit — it will save the page whenever it changes
	* I've been working on the web for 15 years. Building and maintaining each web app takes a lot of brain space. Hyperclay gives you a way to flatten the traditional web app stack into a single file and only focus on making a great, easy-to-modify UI. Then you can just ship that.
		* It's a breath of fresh air and the best programming experience I've had in my life
	* Sign up for early access at hyperclay.com
* Splice together slides and audio (Quicktime? iMovie?)

√√√ ⭐️ ⭐️ ⭐️ MULTI TENANT APPS!!!

√ Design starter template

√ Create starter-template.html
* √ Uses tailwind and tailwind base styles
* √ Same bg as front page
* √ Full length "blank app" button
* √ Clicking blank app grabs HTML from blank.hyperclay.com, saves it, refreshes page
* √ Clicking library apps grabs HTML, saves it, refreshes page

√ Add heading: Achieve the zen of shipping a single-file HTML app
√ Create one line persona
√ Rewrite homepage top area for new persona

√ Add link to docs to home page
√ Standard Terms of service

6/2/2025 App: Landing
* √ Fix: `Uncaught TypeError: Cannot read properties of undefined (reading 'autoPlacement')`
* √ Fix: show pink outline when scrolling
* √ Fix: insert "edit" buttons
* √ use modules instead of umd
* √ Make edit mode toggle work
* √ Strip edit mode toggle before save and then re-insert it on load
	* √ Or just hide it with `option:`
* √ Make edit mode toolbar look nicer

5/31/2025 √ App: Writer
* √ Link editable version from home page

5/30/2025 √ Favicon in prod is wrong

5/30/2025 √ Replace tagline with: Frontend and done

5/30/2025 √ Improved the hyperclay popup copywriting on example apps

5/29/2025 √ App: Kanban
* √ favicon
* √ Link editable version from home page

5/27/2025 √ APP: Panphora 

5/27/2025 √ APP: Devlog
* Fix: make it work with no posts (have hidden post) 
	* add a "new post" button
* √ Clean up content for someone else to repurpose
* √ Link editable version from home page

5/25/2025 √ Tailwind play fixes: dont apply updates if they're the same, ignore updates if triggered from a `mutations-ignore` element

5/23/2025 Better form styling for login page / reset password page — button and inputs have better spacing and sizing

5/22/2025 Change all hyperclay.js imports to use relative paths, so HTML apps can be downloaded and used locally while referencing the same remote scripts

5/22/2025 lazy load all images on home page

5/20/2025 √ Fix a major issue with Tailwind play (Devlog app) causing an infinite browser hang

5/18/2025 √ Add support for a few more Stripe webhook statuses, harden Stripe webhook endpoint: https://gemini.google.com/app/77395423a7f842ca

5/13/2025 Add docs and pricing page to footer

5/13/2025 CTA on Pricing page is "Request Access" instead of "Buy Now"

5/13/2025 open graph / og image
* √ DIDNT USE use this: https://websharebox.s3.amazonaws.com/GpuqKtDaYAIY_jp.jpeg
	* √ DIDNT USE maybe use obsidian as the application? like this: https://websharebox.s3.amazonaws.com/Screenshot%202025-05-08%20at%209.08.07%E2%80%AFPM.png
* √ logo + hyperclay + the personal software stack
* √ host a web app in a single HTML file

5/13/2025 Make early access form functional, submits to backend and sends me an email

5/13/2025 Fix saving apps: needed to make a migration, give SiteVersions a `nodeId`

5/10/2025 Linked Landing example app on homepage

5/9/2025 Created "request early access" page

5/9/2025 Updated footer links to new pages on docs website: changelog, readme, vision

5/8/2025 Make simple local version of hyperclay
* npm package: `hyperclay`
	* https://www.npmjs.com/package/hyperclay
	* https://github.com/panphora/hyperclay-local
	* No, we don't need this: extract hyperclay-starter-kit.js into its own npm package?
* support for (comes as a part of hyperclay.js)
	* `onbeforesave` attribute
	* `save-ignore` attribute
	* `trigger-save` button
	* CMD+s save
* runs a local server where it's run
* localhost:4321
	* serves an open directory of files whereever it's run, including static assets
* localhost:4321/save/name
	* saves ./name.html over itself
* meant to work with apps who have included `hyperclay-starter-kit.js`

5/5/2025 Use app name in route (not subdomain) when saving
* /save/${appName}