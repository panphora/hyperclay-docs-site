---
title: History - The Story of Hyperclay
publish: true
description: The origin story of Hyperclay, from early jQuery experiments to creating a platform for self-modifying HTML
---

How it all started:

Back at my second job, immersed in the simple ecstasy of traversing the DOM with jQuery, our backend developer hacked together an anything-goes /user-data route and handed it off to the front-end team.

We could POST anything to that route and it would save it to the current user's account. It was magical.

5 years later I read about sending rendered HTML templates over the wire instead of JSON to simplify how much state the frontend has to manage.

One job interview at a session replay company later — who told me they were sending whole HTML documents over the wire to render the session replays in their app — and I had the foundation for an epiphany.

The epiphany came on a midday walk when I asked myself the question: "What is a web app, really?"

The answer surprised me: in many cases, it's the ability to modify HTML through a nice UI and share the result.

By that point, I had built about 30 small web projects and come across the same problem over and over again: I could build useful frontend apps in hours, but making them persistent took months (user accounts, database, API routes, templating, state management, file handling, deployment, hosting).

The answer was simple, but scary: allow users to make any change they want to their page (primarily through its UI), send the page's full HTML over the wire, and save it to their user account. Then send it back when they (or another user) requests it.

I took a 4 year detour down the web-stack-framework-making-rabbit-hole because I thought JSON + HTML made a great combo, but I've since come around to the idea that pure HTML is a much more pleasurable stack to work with.

I take strong inspiration from Coda, Notion, Val.town, mmm.page, and LLM artifacts.

I think we're entering a new era of personal, malleable computing where browsing the web feels more like interacting with real objects you can mold, and less like viewing static data locked in a UI you have no control over.