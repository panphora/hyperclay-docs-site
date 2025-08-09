Make everything 80% good:
* Switch out the "Want your own ..." message for the expanding popover I designed
	* Add new meta description that gets pulled into here, with backup message
	* Not expandable any more, switch arrow to top right and just make it a signup button: "Sign up for free"
	* Add multi-tenant cookie
	* Add to every multi-tenant app

Docs
* Finish uncommitted pages
* **Always** use jQuery instead of custom syntax in examples

Email
* Early users only
* Help me test, play, find bugs, early explorer/experimenter
* $15/month plan (early support) or $15/month plan (to really give support)
* Genuine video, 5 min, cover everything you love

Video
* HTML apps as malleable, shareable, portable, persistent documents you fully design and create an inline single-page CMS for
* Uploads, edit uploads
* Edit code
* Copy app
* Tailwind
* jQuery
* Advanced: custom attributes (look at dev log)
* Custom domains!
* Multi tenant!

Gather list of existing signups, tag them with where they came from
* **Folder:**
	* `/_Current/hyperclay/hyperspace-signups`
	* https://mail.google.com/mail/u/1/#search/troy+robinson/QgrcJHsTlmBQzZZfGjMcjMSVmcMPxcFKTJq


### Later

Add Hyperclay Local to home page in prominent spot
* a banner below the example apps
	* "Use these apps like desktop apps"
	* Download Hyperclay Local
		* a free desktop app that lets you run persistently malleable HTML apps locally

Look at:
* **USER-FACING-README.md**
	* This is a good doc, lots of good nuggets here
* SECURITY.md
* README.md
* PROBLEMS.md

Deep dive videos on docs page (and emailed to early users)
* show every high-level feature of the platform
	* how to copy apps
	* how to work with tailwind
	* how to think about the DOM (as a db / permanent repository)
	* how to restore backups
	* deep dive into the code of each example app
* make the extended hours app
* deep dive into each existing example app and how it was built

3 super simple example apps: 
* todo list with edit remove sort
* grid photo album with full screen drop
* drawing app that saves state to json
* game maker: drag and resize a rectangle, give it gravity, make it move with arrow keys

New/better architecture for HTML apps that makes them feel more like apps:
* Decide: do I want to do this? **YES. But not right now.**
	* Pros: 
		* Makes each HTML app *really* powerful and much more like a conventional app, will be more familiar
		* Could have default CRUD interface when you have more than one page in the app, this CRUD UI could be replaced with the devs own
		* Could have default signup/login pages that can be replaced with your own
		* Could allow free user signups
	* Cons: 
		* Each user is relegated to a nested URL on a primary domain e.g. example.com/username
			* Might make it harder to set up custom domains for these nested routes
		* It's no longer a platform for personal software that can be made & cloned by anyone like a Google Doc, it's for standard apps that people sign into
		* It's more confusing: 
			* What if I want to build an app only for myself?
			* How do these apps receive updates?
* Hyperclay is for hosting multi-tenant HTML apps
	* Free signups to Hyperclay allowed
* Plans
	* Free - can access apps with open signups, cannot create apps
	* Paid - can access premium apps, can create apps
* Toggles
	* Invite only: totally private landing page + signup
	* Approved signups: can see landing page but need to be approved to sign up
	* Open signups: can sign up for free, through Hyperclay
	* Premium signups: need to be a paying member of Hyperclay to signup
* Licenses
	* Public domain — clone/modify and use how you want
	* MIT license — clone/modify and use how you want, give credit to original authors
	* Commercial — sign up to use or download to use locally, but you can't resell or give for free
* Routes
	* kanban.hyperclay.com
		* Is either:
			* Editable demo
			* Landing page
	* kanban.hyperclay.com / panphora
		* Question: how do we allow someone to have mutliple pages of the same app then?
			* ❗️This is an important value
			* Default to just showing one, that's easy
			* If more than one, show a standard crud interface that can be replaced with a custom one
		* Is for viewing your page
		* Is for sharing
			* Can be set to private

test local hyperclay: 
```bash
npm install -g hyperclay
# or npm link
hyperclay
```

Add `hyperclay` npm package to docs with explanation
* "Run Hyperclay locally"

Allow customizing starter kit with query strings, e.g. ?enablePersistentFormValues=true/false


3 versions of open source Hyperclay
* Flat (no auth, no multi tenant, meant to be used locally for multiple persistant apps)
* Single tenant (meant to be deployed as a single editable website for a single client)
* Multi tenant (meant to be deployed for multiple clients who all want their own copy of an app)

VIDEO — why I made Hyperclay
* frustration: just when you think you've gotten a handle on what developing a web app actually entails, there's 10 more deep technical tunnels (unrelated to the core goal you're trying to accomplish) that you need to go down to add a single feature to your app. 
	* what if apps were simpler?
* deeper frustration: i'm tired, so so tired, of wanting to build something simple like a personal site that i can update from anywhere and having to either settle for a badly designed existing platform or sort through and orchestrate 10 different services. it's absurd. it feels abusive. it's very anti-creative. 
	* the worst part: those devs who think they're the greatest because they navigate 30 different services and tools every day and know how they all fit together. they are the ones that get to be the arbiter of what gets built and how fast and what's possible, they hold the keys. 
		* this person shouldn't exist, the web platform should be for everyone.
* moment of insight: worked on a page using knockout.js (pre-React MVVM framework) and I realize "hey i'm mostly modifying the DOM in the same way the data is structured on the backend and just sending it back up"
	* what if I could find a way to just mirror the DOM's structure to the backend data?
	* then i wouldn't have to build anything except the DOM!!! 🎉
* 6 years hard work, got banned from a hackathon because remake was too fast at building MVPs (yay!), had a lot of interest, pulled all-nighters multiple times, had a baby, tried over and over again to use it myself, but while it was the coolest original invention i've thought of, it didn't feel natural or intuitive to use and the steps you needed to actually deploy were too many. it wasn't flat/simple/intuitive enough. it wasn't a single thing. there was still a hosting platform, a data layer, and a template layer. the tradeoffs were too big — no access to user accounts or backend APIs. and for what? a CRUD app you had to dive deep to learn.
* where i've ended up: the original "this couldn't possibly work" idea for Remake was just saving HTML. it's dumb and simple and I love the idea of opening up a local html file and have it sync to the world live. it's a malleable online object. that's just magical. it's so much closer to what i think the internet should be. nothing to distract you from the main thing you're actually building.
* why i think this is the best: it feels like writing a blog post or a google doc. it's flat, everything is just right there in front of you. you don't have to go into the internals and rewrite some 3rd layer dependency to get things working how you want. if it works in an HTML page, it just works as a hyperclay app. it's not for building multi-tiered web apps with lots of backend logic, but it doesn't try to be. it's for building flat, lightweight web apps that are portable, shareable, and self-updateable. and it's perfect for that.
* why i think you'll like it: it's fun. genuinely fun. a new way to code. a new web primitive. a way to get something online super quickly and have people interact with and play around with. if you've ever wanted a universal model for a digital object that's simple, portable, transferable, copyable, and editable, this is a great option

* Twitter Friends
	* Catalin
	* Tom Tillistrand
	* Stefano
	* Zach Bialecki ￼
	* Damon Chen
	* Val Sopi 👋
	* Tony Lea
	* Jack Bridger
	* Carl Poppa
	* Daniela 🦩 ctrlalt.cc
	* Charlie Ward 🍜 (ramenclub.so)
	* Joe Masilotti
	* Aletheia Delivre
	* https://bsky.app/profile/larkworthy.bsky.social




Set this up: https://github.com/IHATEGIVINGAUSERNAME/theProtector